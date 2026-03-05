import React from 'react';
import { View } from 'react-native';
import { NavigateActionPayload } from '../../../types/screen';
import { evaluateVisibility } from '../../../utils/sdui/evaluateVisibility';
import { getComponent } from '../registry/ComponentRegistry';

export type DynamicZoneRendererProps = {
  blocks: any[];
  journeyId: string;
  onNavigate: (payload: NavigateActionPayload) => void;
};

export const DynamicBlock: React.FC<{
  block: any;
  journeyId: string;
  onNavigate: (payload: NavigateActionPayload) => void;
}> = ({ block, journeyId, onNavigate }) => {
  if (!evaluateVisibility(block.visibility, journeyId)) return null;

  const Component = getComponent(block.__component);

  if (!Component) return null;

  return <Component {...block} journeyId={journeyId} onNavigate={onNavigate} />;
};

export const DynamicZoneRenderer: React.FC<DynamicZoneRendererProps> = ({
  blocks,
  journeyId,
  onNavigate,
}) => {
  if (!blocks?.length) return null;

  return (
    <View style={{ flex: 1, gap: 16 }}>
      {blocks.map((block, index) => (
        <DynamicBlock
          key={`${block.__component}-${block.id ?? index}`}
          block={block}
          journeyId={journeyId}
          onNavigate={onNavigate}
        />
      ))}
    </View>
  );
};
