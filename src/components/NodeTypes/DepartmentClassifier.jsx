// import React from 'react';
// import { Handle, Position } from '@xyflow/react';
// import NodeOptions from "./NodeOptions";
// const DepartmentClassifier = ({ id, data, selected }) => {
//   const handleHandleClick = (e, department) => {
//     e.stopPropagation();

//     // Get allowed node types for department classifier
//     const allowedTypes = data.allowedConnections || ['rag']; // Default to RAG if not specified

//     // For simplicity, we'll use the first allowed type
//     // You could enhance this to show a menu of allowed types
//     const newNodeType = allowedTypes[0];

//     data.onOptions(id, 'add', null, {
//       newNodeType: newNodeType,
//       department: department
//     });
//   };
//   const nodeStyle = {
//     padding: 10,
//     border: selected
//       ? '3px solid #3b82f6'  // Blue border when selected 
//       : '1px solid black',    // Default border
//     borderRadius: 5,

//     backgroundColor: 'white',
//     boxShadow: selected
//       ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
//       : 'none'
//   };
//   return (
//     <div style={nodeStyle}>
//       <strong>Department Classifier </strong>
//       <NodeOptions id={id} onOptions={data.onOptions}
//         nodeType="departmentClassifier" // Explicitly pass the node type
//         allowedConnections={data.allowedConnections || []}
//         flowType={data.flowType}
//       />
//       <Handle
//         type="source" // This handle is for incoming connections
//         position={Position.Right} // Position the handle at the top of the node
//         style={{ background: '#555' }} // Customize the handle style
//         onClick={handleHandleClick}>

//         <span
//           style={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             color: 'black',
//             fontSize: '25px',
//             pointerEvents: 'none',
//           }}
//         >
//           +
//         </span>
//       </Handle>
//       <Handle
//         type="target" // This handle is for incoming connections
//         position={Position.Left} // Position the handle at the top of the node
//         style={{ background: '#555' }} // Customize the handle style
//       />

//     </div>
//   );
// };

// export default DepartmentClassifier;

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeOptions from './NodeOptions';

const DepartmentClassifier = ({ id, data, selected }) => {
  const handleHandleClick = (e, department = 'default') => {
    e.stopPropagation();

    // Get allowed node types for department classifier
    const allowedTypes = data.allowedConnections || ['rag'];

    // Use the first allowed type (e.g., 'rag') for simplicity
    const newNodeType = allowedTypes[0];

    // Trigger the add action via onOptions
    data.onOptions(id, 'add', null, {
      newNodeType,
      department, // Pass the department (default for now, will be updated in Sidebar)
    });
  };

  const nodeStyle = {
    padding: 10,
    border: selected ? '3px solid #3b82f6' : '1px solid black',
    borderRadius: 5,
    backgroundColor: 'white',
    boxShadow: selected ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
  };

  return (
    <div style={nodeStyle}>
      <strong>Department Classifier</strong>
      <NodeOptions
        id={id}
        onOptions={data.onOptions}
        nodeType="departmentClassifier"
        allowedConnections={data.allowedConnections || []}
        flowType={data.flowType}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
        onClick={(e) => handleHandleClick(e, 'default')} // Default department for new edge
      >
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
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default DepartmentClassifier;