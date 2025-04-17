import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from './NodeOptions';

const InputNode = ({ id, data, selected }) => {
  const nodeStyle = {
    padding: 10,
    border: selected ? '3px solid #3b82f6' : '1px solid black',
    borderRadius: 5,
    backgroundColor: 'white',
    boxShadow: selected
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      : 'none',
  };

  return (
    <div style={nodeStyle}>
      <strong>Start</strong>
      <NodeOptions
        id={id}
        onOptions={data.onOptions}
        nodeType="start"
        allowedConnections={data.allowedConnections || []}
        flowType={data.flowType} // Pass flowType from data
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default InputNode;