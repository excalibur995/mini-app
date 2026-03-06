import { ComponentType } from 'react';

import { ButtonWidget } from '../widgets/Actions/ButtonWidget';
import { CameraCaptureWidget } from '../widgets/Actions/CameraCaptureWidget';
import { BannerWidget } from '../widgets/Display/BannerWidget';
import { IconTextWidget } from '../widgets/Display/IconTextWidget';
import { ImagePreviewWidget } from '../widgets/Display/ImagePreviewWidget';
import { SectionHeaderWidget } from '../widgets/Display/SectionHeaderWidget';
import { Stepper } from '../widgets/Display/Stepper';
import { TextWidget } from '../widgets/Display/TextWidget';
import { RadioGroupWidget } from '../widgets/Inputs/RadioGroupWidget';
import { TextInputWidget } from '../widgets/Inputs/TextInputWidget';

const registry: Record<string, ComponentType<any>> = {
  'ui.button': ButtonWidget,
  'ui.camera-capture': CameraCaptureWidget,
  'ui.text': TextWidget,
  'ui.image-preview': ImagePreviewWidget,
  'ui.radio-group': RadioGroupWidget,
  'ui.text-input': TextInputWidget,
  'ui.section-label': SectionHeaderWidget,
  'ui.banner': BannerWidget,
  'ui.progress-bar': Stepper,
  'ui.icon-text': IconTextWidget,
};

export const getComponent = (
  componentName: string,
): ComponentType<any> | null => {
  const Component = registry[componentName];
  if (!Component) {
    console.warn(`[SDUI] Unregistered component: ${componentName}`);
    return null;
  }
  return Component;
};

export const registerComponent = (
  componentName: string,
  component: ComponentType<any>,
) => {
  registry[componentName] = component;
};
