import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface MultilineTextProps extends TypographyProps<'div'> {
  text: string;
}

const MultilineText: React.FC<MultilineTextProps> = ({ text, ...typographyProps }) => {
  return (
    <Typography<'div'> component="div" {...typographyProps}>
      {text.split('\n').map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </Typography>
  );
};

export default MultilineText;
