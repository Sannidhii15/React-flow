import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from "./NodeOptions";
const ticketcreated = ({ id, data, selected }) => {
    const handleHandleClick = (e) => {
        e.stopPropagation(); // Prevent node click event
        data.onOptions(id, 'add'); // Trigger the add node action
      };
    const nodeStyle = {
        padding: 10,
        border: selected
            ? '3px solid #3b82f6'  // Blue border when selected
            : '1px solid black',    // Default border
        borderRadius: 5,
 
        backgroundColor: 'white',
        boxShadow: selected
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            : 'none'
    };
    return (
        <div style={nodeStyle}>
            <strong>Ticket created successfully</strong>
            <NodeOptions id={id} onOptions={data.onOptions}nodeType="ticketcreated" // Explicitly pass the node type
            allowedConnections={data.allowedConnections || []}
            flowType={data.flowType}  />
           
            <Handle
                type="source" // This handle is for incoming connections
                position={Position.Right} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
                onClick={handleHandleClick}>
                <span
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'black',
                    fontSize: '25px',
                    pointerEvents: 'none',
                }}
              >
                +
              </span>
              </Handle>
            <Handle
                type="target" // This handle is for incoming connections
                position={Position.Left} // Position the handle at the top of the node
                style={{ background: '#555' }} // Customize the handle style
            />
        </div>
    );
};
 
export default ticketcreated;
 