import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {AppColors, AppDimen} from 'presentation/presentation';

interface ShimmerContainerEffectProps {
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
  highlightColor?: string;
}

export const ShimmerContainerEffect: React.FC<ShimmerContainerEffectProps> = ({
  height = (150).rps,
  borderRadius = 15,
  backgroundColor = AppColors.black,
  highlightColor = AppColors.purple,
}) => {
  const width = (AppDimen.current.screenWidth - (16).rps).rps;

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={backgroundColor}
      foregroundColor={highlightColor}>
      <Rect x="0" y="0" rx={borderRadius} ry={borderRadius} width={width} height={height} />
    </ContentLoader>
  );
};
