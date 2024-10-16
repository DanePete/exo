<?php

namespace Drupal\exo_alchemist\Plugin\ExoComponentField;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Plugin\Context\EntityContext;
use Drupal\exo_alchemist\Plugin\ExoComponentFieldComputedBase;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Plugin\ContextAwarePluginInterface;
use Drupal\Core\Url;
use Drupal\exo_alchemist\Plugin\ExoComponentFieldDisplayInterface;
use Drupal\exo_alchemist\Plugin\ExoComponentFieldDisplayTrait;
use Drupal\exo_alchemist\Plugin\ExoComponentFieldFormInterface;
use Drupal\exo_alchemist\Plugin\ExoComponentFieldFormTrait;
use Drupal\exo_alchemist\Plugin\ExoComponentFieldPreviewEntityTrait;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

/**
 * A 'display' adapter for exo components.
 *
 * @ExoComponentField(
 *   id = "display",
 *   deriver = "\Drupal\exo_alchemist\Plugin\Derivative\ExoComponentDisplayEntityDeriver"
 * )
 */
class EntityDisplay extends ExoComponentFieldComputedBase implements ContextAwarePluginInterface, ContainerFactoryPluginInterface, ExoComponentFieldFormInterface, ExoComponentFieldDisplayInterface {

  use ExoComponentFieldFormTrait;
  use ExoComponentFieldPreviewEntityTrait;
  use ExoComponentFieldDisplayTrait;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The logger.
   *
   * @var \Psr\Log\LoggerInterface
   */
  protected $logger;

  /**
   * The entity type ID.
   *
   * @var string
   */
  protected $entityTypeId;

  /**
   * The bundle ID.
   *
   * @var string
   */
  protected $bundle;

  /**
   * The component definition.
   *
   * @var \Drupal\exo_alchemist\Definition\ExoComponentDefinition
   */
  protected $componentDefinition;

  /**
   * Constructs a new FieldBlock.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin ID for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Psr\Log\LoggerInterface $logger
   *   The logger.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity_type_manager, LoggerInterface $logger) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTypeManager = $entity_type_manager;
    $this->logger = $logger;
    $this->entityTypeId = $this->getDisplayedEntityTypeId();
    $this->bundle = $this->getDisplayedBundle();
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('entity_type.manager'),
      $container->get('logger.channel.exo_alchemist')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function propertyInfo() {
    $properties = [
      'entity' => $this->t('The entity object.'),
      'entity_id' => $this->t('The entity id.'),
      'entity_label' => $this->t('The entity label.'),
      'entity_type_id' => $this->t('The entity type id.'),
      'entity_view_url' => $this->t('The entity canonical url.'),
      'entity_edit_url' => $this->t('The entity edit url.'),
    ];
    if (static::getEntityTypeIdFromPluginId($this->getPluginId()) === 'media') {
      if (\Drupal::service('module_handler')->moduleExists('media_entity_download')) {
        $properties['entity_download_url'] = $this->t('The entity download URL.');
      }
    }
    $properties += $this->propertyInfoFieldDisplay();
    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function onFieldInstall() {
    parent::onFieldInstall();
    $this->onFieldInstallFieldDisplay();
  }

  /**
   * {@inheritdoc}
   */
  public function onFieldUpdate() {
    parent::onFieldUpdate();
    $this->onFieldUpdateFieldDisplay();
  }

  /**
   * {@inheritdoc}
   */
  public function onFieldUninstall() {
    parent::onFieldUninstall();
    $this->onFieldUninstallFieldDisplay();
  }

  /**
   * {@inheritdoc}
   */
  public function viewValue(ContentEntityInterface $entity, array $contexts) {
    $values = [];
    if ($entity = $this->getReferencedEntity($contexts)) {
      $contexts['layout_builder.entity'] = EntityContext::fromEntity($entity);
      unset($contexts['entity']);
      $values['entity'] = $entity;
      $values['entity_id'] = $entity->id();
      $values['entity_label'] = $entity->label();
      $values['entity_type_id'] = $entity->getEntityTypeId();
      if (!$entity->isNew()) {
        if ($entity->getEntityType()->hasLinkTemplate('canonical')) {
          $values['entity_view_url'] = $entity->toUrl()->toString();
        }
        if ($entity->getEntityType()->hasLinkTemplate('edit-form')) {
          $values['entity_edit_url'] = $entity->toUrl('edit-form')->toString();
        }
      }
      if ($entity->getEntityTypeId() === 'media' && \Drupal::service('module_handler')->moduleExists('media_entity_download')) {
        $values['entity_download_url'] = Url::fromRoute('media_entity_download.download', ['media' => $entity->id()], [
          'query' => [ResponseHeaderBag::DISPOSITION_INLINE => NULL],
        ])->toString();
      }
      $values += $this->viewValueFieldDisplay($entity, $contexts);
    }
    return $values;
  }

  /**
   * Get the entity of the display.
   *
   * @param \Drupal\Core\Plugin\Context\Context[] $contexts
   *   An array of current contexts.
   *
   * @return \Drupal\Core\Entity\FieldableEntityInterface
   *   The entity.
   */
  protected function getReferencedEntity(array $contexts) {
    $entity = $this->getParentEntity();
    $entity_type_id = static::getEntityTypeIdFromPluginId($this->getPluginId());
    $bundle = static::getBundleFromPluginId($this->getPluginId());
    if ($this->isPreview($contexts) || $this->isDefaultStorage($contexts)) {
      // Always use plugin id for entity type id and bundle as these will be
      // the root entity.
      if ($entity = $this->getPreviewEntity($entity_type_id, $bundle)) {
        \Drupal::messenger()->addMessage($this->t('This component is being previewed using <a href="@url">@label</a>.', [
          '@url' => $entity->getEntityType()->hasLinkTemplate('canonical') ? $entity->toUrl()->toString() : '',
          '@label' => $entity->getEntityType()->getLabel() . ': ' . $entity->label(),
        ]), 'alchemist');
      }
      else {
        \Drupal::messenger()->addWarning($this->t('Please create a @entity_type_id:@bundle entity to improve preview.', [
          '@entity_type_id' => $entity_type_id,
          '@bundle' => $bundle,
        ]));
      }
    }
    elseif ($entity && ($entity->getEntityTypeId() !== $entity_type_id || $entity->bundle() !== $bundle)) {
      if (isset($contexts['layout_builder.entity'])) {
        $entity = $contexts['layout_builder.entity']->getContextValue();
        if ($entity && ($entity->getEntityTypeId() !== $entity_type_id || $entity->bundle() !== $bundle)) {
          return NULL;
        }
      }
      else {
        return NULL;
      }
    }
    return $entity;
  }

  /**
   * {@inheritdoc}
   */
  public function isHideable(array $contexts) {
    // Entity displays are not hideable.
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function isEditable(array $contexts) {
    // Entity displays are not editable. Only fields within them might be.
    return FALSE;
  }

  /**
   * Get the component definition.
   *
   * @return \Drupal\exo_alchemist\Definition\ExoComponentDefinition
   *   The component definition.
   */
  protected function getComponentDefinition() {
    if (!isset($this->componentDefinition)) {
      $field = $this->getFieldDefinition();
      $view_mode = $this->getViewMode();
      $definition = [
        'id' => $field->id(),
        'label' => $field->getComponent()->getLabel() . ': ' . $field->getLabel(),
        'description' => $field->getComponent()->getDescription(),
        'fields' => [],
        'modifier_globals' => FALSE,
        'computed' => TRUE,
      ] + $field->toArray() + $field->getComponent()->toArray();
      /** @var \Drupal\exo_alchemist\Entity\ExoLayoutBuilderEntityViewDisplay $display */
      $display = $this->getEntityViewDisplay();
      foreach ($display->getComponents() as $id => $component) {
        $field_key = $id;
        $field_name = $id;
        // Add fieldupe module support.
        if (substr($id, 0, 9) === 'fieldupe_') {
          /** @var \Drupal\fieldupe\Entity\Fieldupe $dupe */
          $dupe = $this->entityTypeManager->getStorage('fieldupe')->load($id);
          if ($dupe) {
            $field_name = $dupe->getParentField();
            // Shorten the key a bit.
            $field_key = str_replace('fieldupe_' . $dupe->getParentEntityType() . '_' . $dupe->getParentBundle() . '_', 'dupe_', $id);
          }
        }
        $definition['fields'][$field_key] = [
          'type' => 'display_component:' . $this->entityTypeId . ':' . $this->bundle,
          'label' => $display->getComponentLabel($id),
          'component_name' => $id,
          'field_name' => $field_name,
          'view_mode' => $view_mode,
          'computed' => TRUE,
        ];
      }
      $this->exoComponentManager()->processDefinition($definition, $this->getPluginId());
      /** @var \Drupal\exo_alchemist\Definition\ExoComponentDefinition $definition */
      $definition->addParentField($field);
      $this->componentDefinition = $definition;
    }
    return $this->componentDefinition;
  }

  /**
   * {@inheritdoc}
   *
   * Pass alter to children.
   */
  public function formAlter(array &$form, FormStateInterface $form_state) {
    $this->formAlterFieldDisplay($form, $form_state);
  }

  /**
   * {@inheritdoc}
   *
   * Pass validate to children.
   */
  public function formValidate(array $form, FormStateInterface $form_state) {
    $this->formValidateFieldDisplay($form, $form_state);
  }

  /**
   * {@inheritdoc}
   *
   * Pass submit to children.
   */
  public function formSubmit(array $form, FormStateInterface $form_state) {
    $this->formSubmitFieldDisplay($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function getDisplayedEntityTypeId() {
    return static::getEntityTypeIdFromPluginId($this->getPluginId());
  }

  /**
   * {@inheritdoc}
   */
  public function getDisplayedBundle() {
    return static::getBundleFromPluginId($this->getPluginId());
  }

  /**
   * Get entity type id from plugin id.
   *
   * @param string $plugin_id
   *   The plugin id.
   *
   * @return string
   *   The entity type id.
   */
  public static function getEntityTypeIdFromPluginId($plugin_id) {
    $parts = explode(static::DERIVATIVE_SEPARATOR, $plugin_id, 4);
    return $parts[1];
  }

  /**
   * Get bundle id from plugin id.
   *
   * @param string $plugin_id
   *   The plugin id.
   *
   * @return string
   *   The bundle.
   */
  public static function getBundleFromPluginId($plugin_id) {
    $parts = explode(static::DERIVATIVE_SEPARATOR, $plugin_id, 4);
    return $parts[2];
  }

}
