// DebugDrawer.tsx
import React from 'react';
import styled from 'styled-components';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';

SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('python', python);

interface DebugDrawerProps {
  message: string;
  debugMode: boolean;
}

export const DebugDrawer: React.FC<DebugDrawerProps> = ({message, debugMode}) => {
  return (
    <Drawer debugMode={debugMode}>
      <CenteredHeading>Agent Thoughts</CenteredHeading>
      <p dangerouslySetInnerHTML={{__html: message}}/>
    </Drawer>
  );
};

const Drawer = styled.div<{ debugMode: boolean }>`
  width: ${({debugMode}) => debugMode ? '30%' : '0'};
  height: 100vh;
  background: white;
  border-left: 1px solid gray;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
  transition: all 0.2s; // Smooth transition
`;

const CenteredHeading = styled.h3`
  text-align: center;
`;
