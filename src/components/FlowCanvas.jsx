// import React, { useCallback, useState, useEffect } from 'react';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';

// import InputNode from './NodeTypes/InputNode.jsx';
// import Authenticated from './NodeTypes/Authenticated.jsx';
// import NotAuthenticated from './NodeTypes/NotAuthenticated.jsx';
// import DepartmentClassifier from './NodeTypes/DepartmentClassifier.jsx';
// import GladMessage from './NodeTypes/GladMessage.jsx';
// import RAG from './NodeTypes/Rag.jsx';
// import Response from './NodeTypes/Response.jsx';
// import GreetingMessage from './NodeTypes/GreetingNode.jsx';
// import TicketCreation from './NodeTypes/TicketCreation.jsx';
// import LLM from './NodeTypes/LLM.jsx';
// import Prompt from './NodeTypes/prompt.jsx';
// import ticketcreated from './NodeTypes/TicketCreated.jsx';
// import voiceagent from './NodeTypes/voiceAgent.jsx';
// import mailagent from './NodeTypes/mailAgent.jsx';
// import chatagent from './NodeTypes/chatAgent.jsx';
// import Sidebar from './NodeTypes/sidebar.jsx';
// import { nodeConnections, nodeTypeNames } from './NodeTypes/nodeRules.js';

// // Predefined JSON files (unchanged)
// const preDefinedJsonFile = {
//   'startNode.json': { function: 'function', module: 'main_library.function1', endpoint: '/run_function1', methods: ['POST'], parameters: [] },
//   'authNode.json': { function: 'get_auth_url_microsoft', module: 'main_library.microsoft_auth_graph_api', endpoint: '/microsoft/login', methods: ['GET'], parameters: [], response_type: 'redirect' },
//   'handleCallback.json': { function: 'handle_callback', module: 'main_library.microsoft-Authenticated_graph_api', endpoint: '/getAToken', methods: ['GET'], parameters: [{ name: 'code', type: 'query' }, { name: 'error', type: 'query' }, { name: 'error_description', type: 'query' }] },
//   'deptClassifier.json': { function: 'classifyDepartment', module: 'classifier_library.dept', endpoint: '/classify_dept', methods: ['POST'], parameters: ['input_text'] },
//   'messageNode.json': { function: 'sendMessage', module: 'message_library.send', endpoint: '/send_message', methods: ['POST'], parameters: ['message'] },
//   'ragNode.json': { function: 'retrieveAndGenerate', module: 'rag_library.rag', endpoint: '/rag', methods: ['POST'], parameters: ['query'] },
//   'ticketNode.json': { function: 'createTicket', module: 'ticket_library.create', endpoint: '/create_ticket', methods: ['POST'], parameters: ['issue'] },
//   'llmNode.json': { function: 'generateResponse', module: 'llm_library.generate', endpoint: '/generate', methods: ['POST'], parameters: ['prompt'] },
//   'promptNode.json': { function: 'processPrompt', module: 'prompt_library.process', endpoint: '/process_prompt', methods: ['POST'], parameters: ['input'] },
//   'responseNode.json': { function: 'formatResponse', module: 'response_library.format', endpoint: '/format_response', methods: ['POST'], parameters: ['data'] },
// };

// // Default flow initial nodes and edges (unchanged)
// const defaultNodes = [
//   { id: '1', type: 'start', data: { predefinedJson: 'startNode.json', greeting: '', departments: [] }, position: { x: -300, y: 200 }, description: 'This is the entry point of the flow where every conversation begins.' },
//   { id: '2', type: 'authenticatedNode', data: { predefinedJson: 'authNode.json', greeting: '', departments: [] }, position: { x: 300, y: 40 }, description: 'Handles flow for users who are successfully authenticated.' },
//   { id: '3', type: 'notAuthenticatedNode', data: { predefinedJson: 'authNode.json', greeting: '', departments: [] }, position: { x: 300, y: 200 }, description: 'Handles flow for users who failed or skipped authentication.' },
//   { id: '4', type: 'departmentClassifier', data: { predefinedJson: 'deptClassifier.json', greeting: '', departments: ['IT', 'HR', 'Finance'], allowedConnections: nodeConnections.departmentClassifier }, position: { x: 600, y: 350 }, description: 'Identifies and classifies the department relevant to the user\'s query.' },
//   { id: '5', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json', greeting: 'Hello!', departments: [] }, position: { x: 600, y: 40 }, description: 'Displays an initial greeting message to the user.' },
//   { id: '6', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 300 }, description: 'Generates a context-based RAG response for IT department inquiries.' },
//   { id: '7', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 400 }, description: 'Generates a context-based RAG response for HR department inquiries.' },
//   { id: '8', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 500 }, description: 'Generates a context-based RAG response for Finance department inquiries.' },
//   { id: '9', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 2000, y: 200 }, description: 'Displays a positive or closing message to the user.' },
//   { id: '10', type: 'llm', data: { predefinedJson: 'llmNode.json', greeting: '', departments: [] }, position: { x: 1600, y: 300 }, description: 'Processes the user input through a Language Model for dynamic responses.' },
//   { id: '11', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 1600, y: 200 }, description: 'Shows a cheerful or appreciative message to the user.' },
//   { id: '12', type: 'ticketcreation', data: { predefinedJson: 'ticketNode.json', greeting: '', departments: [] }, position: { x: 2000, y: 400 }, description: 'Creates a support ticket for unresolved or complex user issues.' },
//   { id: '13', type: 'prompt', data: { predefinedJson: 'promptNode.json', greeting: '', departments: [] }, position: { x: 300, y: 350 }, description: 'Captures the user\'s input prompt to drive the conversation forward.' },
//   { id: '14', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json', greeting: 'Welcome!', departments: [] }, position: { x: 600, y: 200 }, description: 'Provides a welcoming message to the user at the start of interaction.' },
//   { id: '15', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 500 }, description: 'Formats and displays the final response for Finance-related queries.' },
//   { id: '16', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 400 }, description: 'Formats and displays the final response for HR-related queries.' },
//   { id: '17', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 300 }, description: 'Formats and displays the final response for IT-related queries.' },
//   { id: '18', type: 'ticketcreated', data: { predefinedJson: 'ticketcreated.json', greeting: '', departments: [] }, position: { x: 2400, y: 500 }, description: 'Informs the user that a support ticket has been successfully created.' },
//   { id: '19', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 2400, y: 300 }, description: 'Delivers a final message thanking the user or confirming completion.' },
//   { id: '20', type: 'voiceagent', data: { predefinedJson: 'voiceagent.json', greeting: '', departments: [] }, position: { x: 50, y: 300 }, description: 'Handles input and commands through voice-based interaction.' },
//   { id: '21', type: 'mailagent', data: { predefinedJson: 'mailagent.json', greeting: '', departments: [] }, position: { x: 50, y: 400 }, description: 'Handles input and processing of email-based communication.' },
//   { id: '22', type: 'chatagent', data: { predefinedJson: 'chatagent.json', greeting: '', departments: [] }, position: { x: 50, y: 500 }, description: 'Handles chat-based user queries and communication.' },
// ];

// const defaultEdges = [
//   { id: 'e1-2', source: '1', target: '2', label: 'IF', style: { stroke: 'Black' } },
//   { id: 'e1-3', source: '1', target: '3', label: 'ELSE', style: { stroke: 'Black' } },
//   { id: 'e2-5', source: '2', target: '5', style: { stroke: 'Black' } },
//   { id: 'e3-14', source: '3', target: '14', style: { stroke: 'Black' } },
//   { id: 'e13-4', source: '13', target: '4', style: { stroke: 'Black' } },
//   { id: 'e4-6', source: '4', target: '6', label: 'IT', style: { stroke: 'Black' } },
//   { id: 'e4-7', source: '4', target: '7', label: 'HR', style: { stroke: 'Black' } },
//   { id: 'e4-8', source: '4', target: '8', label: 'Finance', style: { stroke: 'Black' } },
//   { id: 'e6-17', source: '6', target: '17', style: { stroke: 'Black' } },
//   { id: 'e8-15', source: '8', target: '15', style: { stroke: 'Black' } },
//   { id: 'e7-16', source: '7', target: '16', style: { stroke: 'Black' } },
//   { id: 'e17-11', source: '17', target: '11', label: 'YES', style: { stroke: 'Black' } },
//   { id: 'e17-10', source: '17', target: '10', label: 'NO', style: { stroke: 'Black' } },
//   { id: 'e10-12', source: '10', target: '12', label: 'NO', style: { stroke: 'Black' } },
//   { id: 'e10-9', source: '10', target: '9', label: 'YES', style: { stroke: 'Black' } },
//   { id: 'e12-18', source: '12', target: '18', label: 'YES', style: { stroke: 'Black' } },
//   { id: 'e12-19', source: '12', target: '19', label: 'NO', style: { stroke: 'Black' } },
//   { id: 'e1-20', source: '1', target: '20', style: { stroke: 'Black' } },
//   { id: 'e20-13', source: '20', target: '13', style: { stroke: 'Black' } },
//   { id: 'e1-21', source: '1', target: '21', style: { stroke: 'Black' } },
//   { id: 'e21-13', source: '21', target: '13', style: { stroke: 'Black' } },
//   { id: 'e1-22', source: '1', target: '22', style: { stroke: 'Black' } },
//   { id: 'e22-13', source: '22', target: '13', style: { stroke: 'Black' } },
// ];

// // Blank flow with a default start node
// const blankNodes = [
//   {
//     id: '1',
//     type: 'start',
//     data: { predefinedJson: 'startNode.json', greeting: '', departments: [] },
//     position: { x: 0, y: 0 },
//     description: 'This is the entry point of the flow where every conversation begins.'
//   },
// ];
// const blankEdges = [];

// const generateOrchestrationJSON = (nodes, edges) => {
//   const steps = [];
//   const visited = new Set();

//   const traverseFlow = (nodeId) => {
//     if (visited.has(nodeId)) return;
//     visited.add(nodeId);

//     const node = nodes.find((n) => n.id === nodeId);
//     if (node && node.data.predefinedJson) {
//       steps.push(preDefinedJsonFile[node.data.predefinedJson]);
//     }

//     const nextEdges = edges.filter((e) => e.source === nodeId);
//     nextEdges.forEach((edge) => traverseFlow(edge.target));
//   };

//   const startNode = nodes.find((n) => n.type === 'start')?.id || '1';
//   traverseFlow(startNode);
//   return JSON.stringify({ steps }, null, 2);
// };

// const FlowCanvas = () => {
//   const [flowType, setFlowType] = useState('default'); // Default to 'default' flow
//   const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes); // Start with defaultNodes
//   const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges); // Start with defaultEdges
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [showBackPopup, setShowBackPopup] = useState(false); // State for popup visibility

//   const handleNodeOptions = useCallback(
//     (nodeId, action, event, options) => {
//       console.log(`Node ${nodeId} triggered action: ${action}`);
//       switch (action) {
//         case 'delete':
//           setNodes((nds) => nds.filter((n) => n.id !== nodeId));
//           setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
//           setSelectedNode(null);
//           setIsSidebarOpen(false);
//           break;
//         case 'copy':
//           setNodes((nds) => {
//             const nodeToCopy = nds.find((n) => n.id === nodeId);
//             if (!nodeToCopy) return nds;
//             const newNode = {
//               ...nodeToCopy,
//               id: `${nodeToCopy.id}-copy-${Date.now()}`,
//               position: { x: nodeToCopy.position.x + 50, y: nodeToCopy.position.y + 50 },
//               data: { ...nodeToCopy.data, onOptions: handleNodeOptions },
//             };
//             return [...nds, newNode];
//           });
//           break;
//         case 'change':
//           alert(`Change block for node ${nodeId}`);
//           break;
//         case 'about':
//           setNodes((nds) => {
//             const node = nds.find((n) => n.id === nodeId);
//             if (node) {
//               alert(`Node ID: ${node.id}\nType: ${node.type}\nPredefined JSON: ${node.data.predefinedJson}`);
//             }
//             return nds;
//           });
//           break;
//         // case 'add':
//         //   const { newNodeType, department } = options || {};
//         //   if (!newNodeType) {
//         //     alert('Please select a valid node type.');
//         //     return;
//         //   }
//         //   setNodes((nds) => {
//         //     const sourceNode = nds.find((n) => n.id === nodeId);
//         //     if (!sourceNode) return nds;

//         //     const newNodePosition = {
//         //       x: sourceNode.position.x + 200,
//         //       y: sourceNode.position.y,
//         //     };

//         //     const newNodeId = `${Date.now()}`;
//         //     const newNode = {
//         //       id: newNodeId,
//         //       type: newNodeType,
//         //       position: newNodePosition,
//         //       data: {
//         //         predefinedJson: `${newNodeType}Node.json`,
//         //         greeting: '',
//         //         departments: [],
//         //         onOptions: handleNodeOptions,
//         //         allowedConnections: nodeConnections[newNodeType] || [],
//         //         flowType,
//         //         description: nodeTypeNames[newNodeType] || newNodeType,
//         //       },
//         //     };

//         //     setEdges((eds) => [
//         //       ...eds,
//         //       {
//         //         id: `e${nodeId}-${newNodeId}`,
//         //         source: nodeId,
//         //         target: newNodeId,
//         //         label: department || '', // Make sure this is set
//         //         style: { stroke: 'Black' },
//         //         labelStyle: { fontSize: 12 }, // Optional: style for the label
//         //         labelBgStyle: { fill: 'white' }, // Optional: background for the label
//         //       },
//         //     ]);

//         //     return [...nds, newNode];
//         //   });
//         //   break;

//         case 'add':
//           const { newNodeType, department } = options || {};
//           if (!newNodeType) {
//             alert('Please select a valid node type.');
//             return;
//           }
//           setNodes((nds) => {
//             const sourceNode = nds.find((n) => n.id === nodeId);
//             if (!sourceNode) return nds;
        
//             const newNodePosition = {
//               x: sourceNode.position.x + 200,
//               y: sourceNode.position.y,
//             };
        
//             const newNodeId = `${Date.now()}`;
//             const newNode = {
//               id: newNodeId,
//               type: newNodeType,
//               position: newNodePosition,
//               data: {
//                 predefinedJson: `${newNodeType}Node.json`,
//                 greeting: '',
//                 departments: [],
//                 onOptions: handleNodeOptions,
//                 allowedConnections: nodeConnections[newNodeType] || [],
//                 flowType,
//                 description: nodeTypeNames[newNodeType] || newNodeType,
//               },
//             };
        
//             setEdges((eds) => [
//               ...eds,
//               {
//                 id: `e${nodeId}-${newNodeId}`,
//                 source: nodeId,
//                 target: newNodeId,
//                 label: department || 'default', // Use 'default' if no department is provided
//                 style: { stroke: 'Black' },
//                 labelStyle: { fontSize: 12 },
//                 labelBgStyle: { fill: 'white' },
//                 data: { department: department || 'default' }, // Store department in edge data for easy updating
//               },
//             ]);
        
//             return [...nds, newNode];
//           });
//           break;

//         default:
//           break;
//       }
//     },
//     [setNodes, setEdges, flowType]
//   );

//   useEffect(() => {
//     if (flowType) {
//       setNodes((nds) =>
//         nds.map((node) => ({
//           ...node,
//           data: {
//             ...node.data,
//             onOptions: handleNodeOptions,
//             allowedConnections: nodeConnections[node.type] || [],
//             flowType, // Ensure flowType is set for all nodes
//           },
//         }))
//       );
//     }
//   }, [handleNodeOptions, setNodes, flowType]);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
//   const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);
//   const onNodeClick = useCallback(
//     (event, node) => {
//       const isOptionsClick =
//         (event.target.tagName === 'BUTTON' && event.target.textContent === '⋮') ||
//         event.target.closest('[data-options-menu]');
//       if (!isOptionsClick) {
//         const sidebarNode = {
//           id: node.id,
//           type: node.type,
//           name: node.data?.name || node.type.charAt(0).toUpperCase() + node.type.slice(1),
//           description: node.description || 'No description available',
//           position: node.position,
//           data: { ...node.data, onOptions: handleNodeOptions, flowType }, // Pass flowType
//         };
//         setSelectedNode(sidebarNode);
//         setIsSidebarOpen(true);
//       }
//     },
//     [handleNodeOptions, flowType]
//   );

//   const nodeTypes = React.useMemo(
//     () => ({
//       start: InputNode,
//       authenticatedNode: Authenticated,
//       notAuthenticatedNode: NotAuthenticated,
//       departmentClassifier: DepartmentClassifier,
//       gladMessage: GladMessage,
//       rag: RAG,
//       response: Response,
//       greetingMessage: GreetingMessage,
//       ticketcreation: TicketCreation,
//       llm: LLM,
//       prompt: Prompt,
//       ticketcreated: ticketcreated,
//       voiceagent: voiceagent,
//       mailagent: mailagent,
//       chatagent: chatagent,
//     }),
//     []
//   );

//   const handleSaveOrchestration = useCallback(() => {
//     const jsonContent = generateOrchestrationJSON(nodes, edges);
//     const blob = new Blob([jsonContent], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'orchestration.json';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//     alert('Orchestration saved as "orchestration.json"');
//   }, [nodes, edges]);

//   const handleSwitchToBlankFlow = () => {
//     setFlowType('blank');
//     setNodes(blankNodes);
//     setEdges(blankEdges);
//     setSelectedNode(null);
//     setIsSidebarOpen(false);
//   };

//   const handleBack = () => {
//     setFlowType('default'); // Reset to default flow
//     setNodes(defaultNodes);
//     setEdges(defaultEdges);
//     setSelectedNode(null);
//     setIsSidebarOpen(false);
//     setShowBackPopup(false);
//   };

//   const toggleBackPopup = () => {
//     setShowBackPopup((prev) => !prev);
//   };

//   return (
//     <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         onNodeClick={onNodeClick}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//       {/* Back Button Trigger */}
//       <button
//         onClick={toggleBackPopup}
//         style={{
//           position: 'absolute',
//           top: 10,
//           left: 10,
//           padding: '5px 10px',
//           backgroundColor: '#ff4444',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           fontSize: '14px',
//           zIndex: 1000,
//         }}
//       >
//         ← Back
//       </button>
//       {/* Blank Flow Button */}
//       <button
//         onClick={handleSwitchToBlankFlow}
//         style={{
//           position: 'absolute',
//           top: 10,
//           left: 80, // Positioned to the right of the Back button
//           padding: '5px 10px',
//           backgroundColor: '#28a745',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           fontSize: '14px',
//           zIndex: 1000,
//         }}
//       >
//         Blank Flow
//       </button>
//       {/* Save Orchestration Button */}
//       <button
//         onClick={handleSaveOrchestration}
//         style={{
//           position: 'absolute',
//           top: 10,
//           right: isSidebarOpen ? 620 : 10,
//           padding: '10px 20px',
//           backgroundColor: '#007bff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           zIndex: 1000,
//         }}
//       >
//         Save Orchestration
//       </button>
//       {/* Back Popup */}
//       {showBackPopup && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 2000,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'white',
//               padding: '20px',
//               borderRadius: '10px',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//               textAlign: 'center',
//               width: '300px',
//             }}
//           >
//             <h3>Confirm Navigation</h3>
//             <p>Are you sure you want to go back? Unsaved changes will be lost.</p>
//             <div style={{ marginTop: '20px' }}>
//               <button
//                 onClick={handleBack}
//                 style={{
//                   padding: '10px 20px',
//                   margin: '0 10px',
//                   backgroundColor: '#ff4444',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Back
//               </button>
//               <button
//                 onClick={toggleBackPopup}
//                 style={{
//                   padding: '10px 20px',
//                   margin: '0 10px',
//                   backgroundColor: '#6c757d',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <Sidebar
//         selectedNode={selectedNode}
//         isOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//         setNodes={setNodes}
//         setEdges={setEdges}
//         flowType={flowType}
//         edges={edges}
//         nodes={nodes}
//       />
//     </div>
//   );
// };

// export default FlowCanvas;

// Working version of FlowCanvas.jsx

// import React, { useCallback, useState, useEffect } from 'react';
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';

// import InputNode from './NodeTypes/InputNode.jsx';
// import Authenticated from './NodeTypes/Authenticated.jsx';
// import NotAuthenticated from './NodeTypes/NotAuthenticated.jsx';
// import DepartmentClassifier from './NodeTypes/DepartmentClassifier.jsx';
// import GladMessage from './NodeTypes/GladMessage.jsx';
// import RAG from './NodeTypes/Rag.jsx';
// import Response from './NodeTypes/Response.jsx';
// import GreetingMessage from './NodeTypes/GreetingNode.jsx';
// import TicketCreation from './NodeTypes/TicketCreation.jsx';
// import LLM from './NodeTypes/LLM.jsx';
// import Prompt from './NodeTypes/prompt.jsx';
// import ticketcreated from './NodeTypes/TicketCreated.jsx';
// import voiceagent from './NodeTypes/voiceAgent.jsx';
// import mailagent from './NodeTypes/mailAgent.jsx';
// import chatagent from './NodeTypes/chatAgent.jsx';
// import Sidebar from './NodeTypes/sidebar.jsx';
// import { nodeConnections, nodeTypeNames } from './NodeTypes/nodeRules.js';

// // Predefined JSON files (unchanged)
// const preDefinedJsonFile = {
//   'startNode.json': { function: 'function', module: 'main_library.function1', endpoint: '/run_function1', methods: ['POST'], parameters: [] },
//   'authNode.json': { function: 'get_auth_url_microsoft', module: 'main_library.microsoft_auth_graph_api', endpoint: '/microsoft/login', methods: ['GET'], parameters: [], response_type: 'redirect' },
//   'handleCallback.json': { function: 'handle_callback', module: 'main_library.microsoft-Authenticated_graph_api', endpoint: '/getAToken', methods: ['GET'], parameters: [{ name: 'code', type: 'query' }, { name: 'error', type: 'query' }, { name: 'error_description', type: 'query' }] },
//   'deptClassifier.json': { function: 'classifyDepartment', module: 'classifier_library.dept', endpoint: '/classify_dept', methods: ['POST'], parameters: ['input_text'] },
//   'messageNode.json': { function: 'sendMessage', module: 'message_library.send', endpoint: '/send_message', methods: ['POST'], parameters: ['message'] },
//   'ragNode.json': { function: 'retrieveAndGenerate', module: 'rag_library.rag', endpoint: '/rag', methods: ['POST'], parameters: ['query'] },
//   'ticketNode.json': { function: 'createTicket', module: 'ticket_library.create', endpoint: '/create_ticket', methods: ['POST'], parameters: ['issue'] },
//   'llmNode.json': { function: 'generateResponse', module: 'llm_library.generate', endpoint: '/generate', methods: ['POST'], parameters: ['prompt'] },
//   'promptNode.json': { function: 'processPrompt', module: 'prompt_library.process', endpoint: '/process_prompt', methods: ['POST'], parameters: ['input'] },
//   'responseNode.json': { function: 'formatResponse', module: 'response_library.format', endpoint: '/format_response', methods: ['POST'], parameters: ['data'] },
// };

// // Default flow initial nodes and edges (unchanged)
// const defaultNodes = [
//   { id: '1', type: 'start', data: { predefinedJson: 'startNode.json', greeting: '', departments: [] }, position: { x: -300, y: 200 }, description: 'This is the entry point of the flow where every conversation begins.' },
//   { id: '2', type: 'authenticatedNode', data: { predefinedJson: 'authNode.json', greeting: '', departments: [] }, position: { x: 300, y: 40 }, description: 'Handles flow for users who are successfully authenticated.' },
//   { id: '3', type: 'notAuthenticatedNode', data: { predefinedJson: 'authNode.json', greeting: '', departments: [] }, position: { x: 300, y: 200 }, description: 'Handles flow for users who failed or skipped authentication.' },
//   { id: '4', type: 'departmentClassifier', data: { predefinedJson: 'deptClassifier.json', greeting: '', departments: ['IT', 'HR', 'Finance'], allowedConnections: nodeConnections.departmentClassifier }, position: { x: 600, y: 350 }, description: 'Identifies and classifies the department relevant to the user\'s query.' },
//   { id: '5', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json', greeting: 'Hello!', departments: [] }, position: { x: 600, y: 40 }, description: 'Displays an initial greeting message to the user.' },
//   // { id: '6', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 300 }, description: 'Generates a context-based RAG response for IT department inquiries.' },
//   { id: '7', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 400 }, description: 'Generates a context-based RAG response for HR department inquiries.' },
//   // { id: '8', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 500 }, description: 'Generates a context-based RAG response for Finance department inquiries.' },
//   { id: '9', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 2000, y: 200 }, description: 'Displays a positive or closing message to the user.' },
//   { id: '10', type: 'llm', data: { predefinedJson: 'llmNode.json', greeting: '', departments: [] }, position: { x: 1600, y: 300 }, description: 'Processes the user input through a Language Model for dynamic responses.' },
//   { id: '11', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 1600, y: 200 }, description: 'Shows a cheerful or appreciative message to the user.' },
//   { id: '12', type: 'ticketcreation', data: { predefinedJson: 'ticketNode.json', greeting: '', departments: [] }, position: { x: 2000, y: 400 }, description: 'Creates a support ticket for unresolved or complex user issues.' },
//   { id: '13', type: 'prompt', data: { predefinedJson: 'promptNode.json', greeting: '', departments: [] }, position: { x: 300, y: 350 }, description: 'Captures the user\'s input prompt to drive the conversation forward.' },
//   { id: '14', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json', greeting: 'Welcome!', departments: [] }, position: { x: 600, y: 200 }, description: 'Provides a welcoming message to the user at the start of interaction.' },
//   { id: '15', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 500 }, description: 'Formats and displays the final response for Finance-related queries.' },
//   { id: '16', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 400 }, description: 'Formats and displays the final response for HR-related queries.' },
//   { id: '17', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 300 }, description: 'Formats and displays the final response for IT-related queries.' },
//   { id: '18', type: 'ticketcreated', data: { predefinedJson: 'ticketcreated.json', greeting: '', departments: [] }, position: { x: 2400, y: 500 }, description: 'Informs the user that a support ticket has been successfully created.' },
//   { id: '19', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 2400, y: 300 }, description: 'Delivers a final message thanking the user or confirming completion.' },
//   { id: '20', type: 'voiceagent', data: { predefinedJson: 'voiceagent.json', greeting: '', departments: [] }, position: { x: 50, y: 300 }, description: 'Handles input and commands through voice-based interaction.' },
//   { id: '21', type: 'mailagent', data: { predefinedJson: 'mailagent.json', greeting: '', departments: [] }, position: { x: 50, y: 400 }, description: 'Handles input and processing of email-based communication.' },
//   { id: '22', type: 'chatagent', data: { predefinedJson: 'chatagent.json', greeting: '', departments: [] }, position: { x: 50, y: 500 }, description: 'Handles chat-based user queries and communication.' },
// ];

// const defaultEdges = [
//   { id: 'e1-2', source: '1', target: '2', label: 'IF', style: { stroke: 'Black' } },
//   { id: 'e1-3', source: '1', target: '3', label: 'ELSE', style: { stroke: 'Black' } },
//   { id: 'e2-5', source: '2', target: '5', style: { stroke: 'Black' } },
//   { id: 'e3-14', source: '3', target: '14', style: { stroke: 'Black' } },
//   { id: 'e13-4', source: '13', target: '4', style: { stroke: 'Black' } },
//   // { id: 'e4-6', source: '4', target: '6', label: 'IT', style: { stroke: 'Black' } },
//   { id: 'e4-7', source: '4', target: '7',  style: { stroke: 'Black' } },
//   { id: 'e7-15', source: '7', target: '15',  style: { stroke: 'Black' } },
//   { id: 'e7-17', source: '7', target: '17',  style: { stroke: 'Black' } },
//   // { id: 'e4-8', source: '4', target: '8', label: 'Finance', style: { stroke: 'Black' } },
//   { id: 'e6-17', source: '6', target: '17', style: { stroke: 'Black' } },
//   { id: 'e8-15', source: '8', target: '15', style: { stroke: 'Black' } },
//   { id: 'e7-16', source: '7', target: '16', style: { stroke: 'Black' } },
//   { id: 'e17-11', source: '17', target: '11', label: 'YES', style: { stroke: 'Black' } },
//   { id: 'e17-10', source: '17', target: '10', label: 'NO', style: { stroke: 'Black' } },
//   { id: 'e10-12', source: '10', target: '12', label: 'NO', style: { stroke: 'Black' } },
//   { id: 'e10-9', source: '10', target: '9', label: 'YES', style: { stroke: 'Black' } },
//   { id: 'e12-18', source: '12', target: '18', label: 'YES', style: { stroke: 'Black' } },
//   { id: 'e12-19', source: '12', target: '19', label: 'NO', style: { stroke: 'Black' } },
//   { id: 'e1-20', source: '1', target: '20', style: { stroke: 'Black' } },
//   { id: 'e20-13', source: '20', target: '13', style: { stroke: 'Black' } },
//   { id: 'e1-21', source: '1', target: '21', style: { stroke: 'Black' } },
//   { id: 'e21-13', source: '21', target: '13', style: { stroke: 'Black' } },
//   { id: 'e1-22', source: '1', target: '22', style: { stroke: 'Black' } },
//   { id: 'e22-13', source: '22', target: '13', style: { stroke: 'Black' } },
// ];

// // Blank flow with a default start node
// const blankNodes = [
//   {
//     id: '1',
//     type: 'start',
//     data: { predefinedJson: 'startNode.json', greeting: '', departments: [] },
//     position: { x: 0, y: 0 },
//     description: 'This is the entry point of the flow where every conversation begins.'
//   },
// ];
// const blankEdges = [];

// const generateOrchestrationJSON = (nodes, edges) => {
//   const steps = [];
//   const visited = new Set();

//   const traverseFlow = (nodeId) => {
//     if (visited.has(nodeId)) return;
//     visited.add(nodeId);

//     const node = nodes.find((n) => n.id === nodeId);
//     if (node && node.data.predefinedJson) {
//       steps.push(preDefinedJsonFile[node.data.predefinedJson]);
//     }

//     const nextEdges = edges.filter((e) => e.source === nodeId);
//     nextEdges.forEach((edge) => traverseFlow(edge.target));
//   };

//   const startNode = nodes.find((n) => n.type === 'start')?.id || '1';
//   traverseFlow(startNode);
//   return JSON.stringify({ steps }, null, 2);
// };

// const FlowCanvas = () => {
//   const [flowType, setFlowType] = useState('default');
//   const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedNode, setSelectedNode] = useState(null);
//   const [showBackPopup, setShowBackPopup] = useState(false);

//   const handleNodeOptions = useCallback(
//     (nodeId, action, event, options) => {
//       console.log(`Node ${nodeId} triggered action: ${action}`);
//       switch (action) {
//         case 'delete':
//           setNodes((nds) => nds.filter((n) => n.id !== nodeId));
//           setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
//           setSelectedNode(null);
//           setIsSidebarOpen(false);
//           break;
//         case 'copy':
//           setNodes((nds) => {
//             const nodeToCopy = nds.find((n) => n.id === nodeId);
//             if (!nodeToCopy) return nds;
//             const newNode = {
//               ...nodeToCopy,
//               id: `${nodeToCopy.id}-copy-${Date.now()}`,
//               position: { x: nodeToCopy.position.x + 50, y: nodeToCopy.position.y + 50 },
//               data: { ...nodeToCopy.data, onOptions: handleNodeOptions },
//             };
//             return [...nds, newNode];
//           });
//           break;
//         case 'change':
//           alert(`Change block for node ${nodeId}`);
//           break;
//         case 'about':
//           setNodes((nds) => {
//             const node = nds.find((n) => n.id === nodeId);
//             if (node) {
//               alert(`Node ID: ${node.id}\nType: ${node.type}\nPredefined JSON: ${node.data.predefinedJson}`);
//             }
//             return nds;
//           });
//           break;
//         case 'add':
//           const { newNodeType, department } = options || {};
//           if (!newNodeType) {
//             alert('Please select a valid node type.');
//             return;
//           }
//           setNodes((nds) => {
//             const sourceNode = nds.find((n) => n.id === nodeId);
//             if (!sourceNode) return nds;

//             const newNodePosition = {
//               x: sourceNode.position.x + 200,
//               y: sourceNode.position.y,
//             };

//             const newNodeId = `${Date.now()}`;
//             console.log(`${Date.now()}`)
//             const edgeId = `e${nodeId}-${newNodeId}`;
//             const newNode = {
//               id: newNodeId,
//               type: newNodeType,
//               position: newNodePosition,
//               data: {
//                 predefinedJson: `${newNodeType}Node.json`,
//                 greeting: '',
//                 departments: [],
//                 onOptions: handleNodeOptions,
//                 allowedConnections: nodeConnections[newNodeType] || [],
//                 flowType,
//                 description: nodeTypeNames[newNodeType] || newNodeType,
//                 createdEdgeId: edgeId, // Store edge ID for reference
//               },
//             };

//             setEdges((eds) => [
//               ...eds,
//               {
//                 id: edgeId,
//                 source: nodeId,
//                 target: newNodeId,
//                 label: department || '',
//                 style: { stroke: 'Black' },
//                 labelStyle: { fontSize: 12 },
//                 labelBgStyle: { fill: 'white' },
//                 data: { department: department || '' },
//               },
//             ]);

//             return [...nds, newNode];
//           });
//           break;
//         default:
//           break;
//       }
//     },
//     [setNodes, setEdges, flowType]
//   );

//   useEffect(() => {
//     if (flowType) {
//       setNodes((nds) =>
//         nds.map((node) => ({
//           ...node,
//           data: {
//             ...node.data,
//             onOptions: handleNodeOptions,
//             allowedConnections: nodeConnections[node.type] || [],
//             flowType,
//           },
//         }))
//       );
//     }
//   }, [handleNodeOptions, setNodes, flowType]);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
//   const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);
//   const onNodeClick = useCallback(
//     (event, node) => {
//       const isOptionsClick =
//         (event.target.tagName === 'BUTTON' && event.target.textContent === '⋮') ||
//         event.target.closest('[data-options-menu]');
//       if (!isOptionsClick) {
//         const sidebarNode = {
//           id: node.id,
//           type: node.type,
//           name: node.data?.name || node.type.charAt(0).toUpperCase() + node.type.slice(1),
//           description: node.description || 'No description available',
//           position: node.position,
//           data: { ...node.data, onOptions: handleNodeOptions, flowType },
//         };
//         setSelectedNode(sidebarNode);
//         setIsSidebarOpen(true);
//       }
//     },
//     [handleNodeOptions, flowType]
//   );

//   const nodeTypes = React.useMemo(
//     () => ({
//       start: InputNode,
//       authenticatedNode: Authenticated,
//       notAuthenticatedNode: NotAuthenticated,
//       departmentClassifier: DepartmentClassifier,
//       gladMessage: GladMessage,
//       rag: RAG,
//       response: Response,
//       greetingMessage: GreetingMessage,
//       ticketcreation: TicketCreation,
//       llm: LLM,
//       prompt: Prompt,
//       ticketcreated: ticketcreated,
//       voiceagent: voiceagent,
//       mailagent: mailagent,
//       chatagent: chatagent,
//     }),
//     []
//   );

//   const handleSaveOrchestration = useCallback(() => {
//     const jsonContent = generateOrchestrationJSON(nodes, edges);
//     const blob = new Blob([jsonContent], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'orchestration.json';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//     alert('Orchestration saved as "orchestration.json"');
//   }, [nodes, edges]);

//   const handleSwitchToBlankFlow = () => {
//     setFlowType('blank');
//     setNodes(blankNodes);
//     setEdges(blankEdges);
//     setSelectedNode(null);
//     setIsSidebarOpen(false);
//   };

//   const handleBack = () => {
//     setFlowType('default');
//     setNodes(defaultNodes);
//     setEdges(defaultEdges);
//     setSelectedNode(null);
//     setIsSidebarOpen(false);
//     setShowBackPopup(false);
//   };

//   const toggleBackPopup = () => {
//     setShowBackPopup((prev) => !prev);
//   };

//   return (
//     <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         onNodeClick={onNodeClick}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//       <button
//         onClick={toggleBackPopup}
//         style={{
//           position: 'absolute',
//           top: 10,
//           left: 10,
//           padding: '5px 10px',
//           backgroundColor: '#ff4444',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           fontSize: '14px',
//           zIndex: 1000,
//         }}
//       >
//         ← Back
//       </button>
//       <button
//         onClick={handleSwitchToBlankFlow}
//         style={{
//           position: 'absolute',
//           top: 10,
//           left: 80,
//           padding: '5px 10px',
//           backgroundColor: '#28a745',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           fontSize: '14px',
//           zIndex: 1000,
//         }}
//       >
//         Blank Flow
//       </button>
//       <button
//         onClick={handleSaveOrchestration}
//         style={{
//           position: 'absolute',
//           top: 10,
//           right: isSidebarOpen ? 620 : 10,
//           padding: '10px 20px',
//           backgroundColor: '#007bff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer',
//           zIndex: 1000,
//         }}
//       >
//         Save Orchestration
//       </button>
//       {showBackPopup && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 2000,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: 'white',
//               padding: '20px',
//               borderRadius: '10px',
//               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//               textAlign: 'center',
//               width: '300px',
//             }}
//           >
//             <h3>Confirm Navigation</h3>
//             <p>Are you sure you want to go back? Unsaved changes will be lost.</p>
//             <div style={{ marginTop: '20px' }}>
//               <button
//                 onClick={handleBack}
//                 style={{
//                   padding: '10px 20px',
//                   margin: '0 10px',
//                   backgroundColor: '#ff4444',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Back
//               </button>
//               <button
//                 onClick={toggleBackPopup}
//                 style={{
//                   padding: '10px 20px',
//                   margin: '0 10px',
//                   backgroundColor: '#6c757d',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <Sidebar
//         selectedNode={selectedNode}
//         isOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//         setNodes={setNodes}
//         setEdges={setEdges}
//         flowType={flowType}
//         edges={edges}
//         nodes={nodes}
//       />
//     </div>
//   );
// };

// export default FlowCanvas;







import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import InputNode from './NodeTypes/InputNode.jsx';
import Authenticated from './NodeTypes/Authenticated.jsx';
import NotAuthenticated from './NodeTypes/NotAuthenticated.jsx';
import DepartmentClassifier from './NodeTypes/DepartmentClassifier.jsx';
import GladMessage from './NodeTypes/GladMessage.jsx';
import RAG from './NodeTypes/Rag.jsx';
import Response from './NodeTypes/Response.jsx';
import GreetingMessage from './NodeTypes/GreetingNode.jsx';
import TicketCreation from './NodeTypes/TicketCreation.jsx';
import LLM from './NodeTypes/LLM.jsx';
import Prompt from './NodeTypes/prompt.jsx';
import ticketcreated from './NodeTypes/TicketCreated.jsx';
import voiceagent from './NodeTypes/voiceAgent.jsx';
import mailagent from './NodeTypes/mailAgent.jsx';
import chatagent from './NodeTypes/chatAgent.jsx';
import Sidebar from './NodeTypes/sidebar.jsx';
import { nodeConnections, nodeTypeNames } from './NodeTypes/nodeRules.js';

// Predefined JSON files (unchanged)
const preDefinedJsonFile = {
  'startNode.json': { function: 'function', module: 'main_library.function1', endpoint: '/run_function1', methods: ['POST'], parameters: [] },
  'authNode.json': { function: 'get_auth_url_microsoft', module: 'main_library.microsoft_auth_graph_api', endpoint: '/microsoft/login', methods: ['GET'], parameters: [], response_type: 'redirect' },
  'handleCallback.json': { function: 'handle_callback', module: 'main_library.microsoft-Authenticated_graph_api', endpoint: '/getAToken', methods: ['GET'], parameters: [{ name: 'code', type: 'query' }, { name: 'error', type: 'query' }, { name: 'error_description', type: 'query' }] },
  'deptClassifier.json': { function: 'classifyDepartment', module: 'classifier_library.dept', endpoint: '/classify_dept', methods: ['POST'], parameters: ['input_text'] },
  'messageNode.json': { function: 'sendMessage', module: 'message_library.send', endpoint: '/send_message', methods: ['POST'], parameters: ['message'] },
  'ragNode.json': { function: 'retrieveAndGenerate', module: 'rag_library.rag', endpoint: '/rag', methods: ['POST'], parameters: ['query'] },
  'ticketNode.json': { function: 'createTicket', module: 'ticket_library.create', endpoint: '/create_ticket', methods: ['POST'], parameters: ['issue'] },
  'llmNode.json': { function: 'generateResponse', module: 'llm_library.generate', endpoint: '/generate', methods: ['POST'], parameters: ['prompt'] },
  'promptNode.json': { function: 'processPrompt', module: 'prompt_library.process', endpoint: '/process_prompt', methods: ['POST'], parameters: ['input'] },
  'responseNode.json': { function: 'formatResponse', module: 'response_library.format', endpoint: '/format_response', methods: ['POST'], parameters: ['data'] },
};

// Default flow initial nodes and edges (unchanged)
const defaultNodes = [
  { id: '1', type: 'start', data: { predefinedJson: 'startNode.json', greeting: '', departments: [] }, position: { x: -300, y: 200 }, description: 'This is the entry point of the flow where every conversation begins.' },
  { id: '2', type: 'authenticatedNode', data: { predefinedJson: 'authNode.json', greeting: '', departments: [] }, position: { x: 300, y: 40 }, description: 'Handles flow for users who are successfully authenticated.' },
  { id: '3', type: 'notAuthenticatedNode', data: { predefinedJson: 'authNode.json', greeting: '', departments: [] }, position: { x: 300, y: 200 }, description: 'Handles flow for users who failed or skipped authentication.' },
  { id: '4', type: 'departmentClassifier', data: { predefinedJson: 'deptClassifier.json', greeting: '', departments: ['IT', 'HR', 'Finance'], allowedConnections: nodeConnections.departmentClassifier }, position: { x: 600, y: 350 }, description: 'Identifies and classifies the department relevant to the user\'s query.' },
  { id: '5', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json', greeting: 'Hello!', departments: [] }, position: { x: 600, y: 40 }, description: 'Displays an initial greeting message to the user.' },
  // { id: '6', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 300 }, description: 'Generates a context-based RAG response for IT department inquiries.' },
  { id: '7', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 400 }, description: 'Generates a context-based RAG response for HR department inquiries.' },
  // { id: '8', type: 'rag', data: { predefinedJson: 'ragNode.json', greeting: '', departments: [] }, position: { x: 1100, y: 500 }, description: 'Generates a context-based RAG response for Finance department inquiries.' },
  { id: '9', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 2000, y: 200 }, description: 'Displays a positive or closing message to the user.' },
  { id: '10', type: 'llm', data: { predefinedJson: 'llmNode.json', greeting: '', departments: [] }, position: { x: 1600, y: 300 }, description: 'Processes the user input through a Language Model for dynamic responses.' },
  { id: '11', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 1600, y: 200 }, description: 'Shows a cheerful or appreciative message to the user.' },
  { id: '12', type: 'ticketcreation', data: { predefinedJson: 'ticketNode.json', greeting: '', departments: [] }, position: { x: 2000, y: 400 }, description: 'Creates a support ticket for unresolved or complex user issues.' },
  { id: '13', type: 'prompt', data: { predefinedJson: 'promptNode.json', greeting: '', departments: [] }, position: { x: 300, y: 350 }, description: 'Captures the user\'s input prompt to drive the conversation forward.' },
  { id: '14', type: 'greetingMessage', data: { predefinedJson: 'messageNode.json', greeting: 'Welcome!', departments: [] }, position: { x: 600, y: 200 }, description: 'Provides a welcoming message to the user at the start of interaction.' },
  { id: '15', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 500 }, description: 'Formats and displays the final response for Finance-related queries.' },
  { id: '16', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 400 }, description: 'Formats and displays the final response for HR-related queries.' },
  { id: '17', type: 'response', data: { predefinedJson: 'responseNode.json', greeting: '', departments: [] }, position: { x: 1300, y: 300 }, description: 'Formats and displays the final response for IT-related queries.' },
  { id: '18', type: 'ticketcreated', data: { predefinedJson: 'ticketcreated.json', greeting: '', departments: [] }, position: { x: 2400, y: 500 }, description: 'Informs the user that a support ticket has been successfully created.' },
  { id: '19', type: 'gladMessage', data: { predefinedJson: 'messageNode.json', greeting: '', departments: [] }, position: { x: 2400, y: 300 }, description: 'Delivers a final message thanking the user or confirming completion.' },
  { id: '20', type: 'voiceagent', data: { predefinedJson: 'voiceagent.json', greeting: '', departments: [] }, position: { x: 50, y: 300 }, description: 'Handles input and commands through voice-based interaction.' },
  { id: '21', type: 'mailagent', data: { predefinedJson: 'mailagent.json', greeting: '', departments: [] }, position: { x: 50, y: 400 }, description: 'Handles input and processing of email-based communication.' },
  { id: '22', type: 'chatagent', data: { predefinedJson: 'chatagent.json', greeting: '', departments: [] }, position: { x: 50, y: 500 }, description: 'Handles chat-based user queries and communication.' },
];

const defaultEdges = [
  { id: 'e1-2', source: '1', target: '2', label: 'IF', style: { stroke: 'Black' } },
  { id: 'e1-3', source: '1', target: '3', label: 'ELSE', style: { stroke: 'Black' } },
  { id: 'e2-5', source: '2', target: '5', style: { stroke: 'Black' } },
  { id: 'e3-14', source: '3', target: '14', style: { stroke: 'Black' } },
  { id: 'e13-4', source: '13', target: '4', style: { stroke: 'Black' } },
  // { id: 'e4-6', source: '4', target: '6', label: 'IT', style: { stroke: 'Black' } },
  { id: 'e4-7', source: '4', target: '7',  style: { stroke: 'Black' } },
  
  { id: 'e7-15', source: '7', target: '15',  style: { stroke: 'Black' } },
  { id: 'e7-17', source: '7', target: '17',  style: { stroke: 'Black' } },
  // { id: 'e4-8', source: '4', target: '8', label: 'Finance', style: { stroke: 'Black' } },
  { id: 'e6-17', source: '6', target: '17', style: { stroke: 'Black' } },
  { id: 'e8-15', source: '8', target: '15', style: { stroke: 'Black' } },
  { id: 'e7-16', source: '7', target: '16', style: { stroke: 'Black' } },
  { id: 'e17-11', source: '17', target: '11', label: 'YES', style: { stroke: 'Black' } },
  { id: 'e17-10', source: '17', target: '10', label: 'NO', style: { stroke: 'Black' } },
  { id: 'e10-12', source: '10', target: '12', label: 'NO', style: { stroke: 'Black' } },
  { id: 'e10-9', source: '10', target: '9', label: 'YES', style: { stroke: 'Black' } },
  { id: 'e12-18', source: '12', target: '18', label: 'YES', style: { stroke: 'Black' } },
  { id: 'e12-19', source: '12', target: '19', label: 'NO', style: { stroke: 'Black' } },
  { id: 'e1-20', source: '1', target: '20', style: { stroke: 'Black' } },
  { id: 'e20-13', source: '20', target: '13', style: { stroke: 'Black' } },
  { id: 'e1-21', source: '1', target: '21', style: { stroke: 'Black' } },
  { id: 'e21-13', source: '21', target: '13', style: { stroke: 'Black' } },
  { id: 'e1-22', source: '1', target: '22', style: { stroke: 'Black' } },
  { id: 'e22-13', source: '22', target: '13', style: { stroke: 'Black' } },
];

// Blank flow with a default start node
const blankNodes = [
  {
    id: '1',
    type: 'start',
    data: { predefinedJson: 'startNode.json', greeting: '', departments: [] },
    position: { x: 0, y: 0 },
    description: 'This is the entry point of the flow where every conversation begins.'
  },
];
const blankEdges = [];

const generateOrchestrationJSON = (nodes, edges) => {
  const steps = [];
  const visited = new Set();

  const traverseFlow = (nodeId) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (node && node.data.predefinedJson) {
      steps.push(preDefinedJsonFile[node.data.predefinedJson]);
    }

    const nextEdges = edges.filter((e) => e.source === nodeId);
    nextEdges.forEach((edge) => traverseFlow(edge.target));
  };

  const startNode = nodes.find((n) => n.type === 'start')?.id || '1';
  traverseFlow(startNode);
  return JSON.stringify({ steps }, null, 2);
};

const FlowCanvas = () => {
  const [flowType, setFlowType] = useState('default');
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showBackPopup, setShowBackPopup] = useState(false);

  const handleNodeOptions = useCallback(
    (nodeId, action, event, options) => {
      console.log(`Node ${nodeId} triggered action: ${action}`);
      switch (action) {
        case 'delete':
          setNodes((nds) => nds.filter((n) => n.id !== nodeId));
          setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
          setSelectedNode(null);
          setIsSidebarOpen(false);
          break;
        case 'copy':
          setNodes((nds) => {
            const nodeToCopy = nds.find((n) => n.id === nodeId);
            if (!nodeToCopy) return nds;
            const newNode = {
              ...nodeToCopy,
              id: `${nodeToCopy.id}-copy-${Date.now()}`,
              position: { x: nodeToCopy.position.x + 50, y: nodeToCopy.position.y + 50 },
              data: { ...nodeToCopy.data, onOptions: handleNodeOptions },
            };
            return [...nds, newNode];
          });
          break;
        case 'change':
          alert(`Change block for node ${nodeId}`);
          break;
        case 'about':
          setNodes((nds) => {
            const node = nds.find((n) => n.id === nodeId);
            if (node) {
              alert(`Node ID: ${node.id}\nType: ${node.type}\nPredefined JSON: ${node.data.predefinedJson}`);
            }
            return nds;
          });
          break;
        case 'add':
          const { newNodeType, department } = options || {};
          if (!newNodeType) {
            alert('Please select a valid node type.');
            return;
          }
          setNodes((nds) => {
            const sourceNode = nds.find((n) => n.id === nodeId);
            if (!sourceNode) return nds;

            const newNodePosition = {
              x: sourceNode.position.x + 200,
              y: sourceNode.position.y,
            };

            const newNodeId = `${Date.now()}`;
            console.log(`${Date.now()}`)
            const edgeId = `e${nodeId}-${newNodeId}`;
            const newNode = {
              id: newNodeId,
              type: newNodeType,
              position: newNodePosition,
              data: {
                predefinedJson: `${newNodeType}Node.json`,
                greeting: '',
                departments: [],
                onOptions: handleNodeOptions,
                allowedConnections: nodeConnections[newNodeType] || [],
                flowType,
                description: nodeTypeNames[newNodeType] || newNodeType,
                createdEdgeId: edgeId, // Store edge ID for reference
              },
            };

            setEdges((eds) => [
              ...eds,
              {
                id: edgeId,
                source: nodeId,
                target: newNodeId,
                label: department || '',
                style: { stroke: 'Black' },
                labelStyle: { fontSize: 12 },
                labelBgStyle: { fill: 'white' },
                data: { department: department || '' },
              },
            ]);

            return [...nds, newNode];
          });
          break;
        
        default:
          break;
      }
    },
    [setNodes, setEdges, flowType]
  );

  useEffect(() => {
    if (flowType) {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            onOptions: handleNodeOptions,
            allowedConnections: nodeConnections[node.type] || [],
            flowType,
          },
        }))
      );
    }
  }, [handleNodeOptions, setNodes, flowType]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);
  const onNodeClick = useCallback(
    (event, node) => {
      const isOptionsClick =
        (event.target.tagName === 'BUTTON' && event.target.textContent === '⋮') ||
        event.target.closest('[data-options-menu]');
      if (!isOptionsClick) {
        const sidebarNode = {
          id: node.id,
          type: node.type,
          name: node.data?.name || node.type.charAt(0).toUpperCase() + node.type.slice(1),
          description: node.description || 'No description available',
          position: node.position,
          data: { ...node.data, onOptions: handleNodeOptions, flowType },
        };
        setSelectedNode(sidebarNode);
        setIsSidebarOpen(true);
      }
    },
    [handleNodeOptions, flowType]
  );

  const nodeTypes = React.useMemo(
    () => ({
      start: InputNode,
      authenticatedNode: Authenticated,
      notAuthenticatedNode: NotAuthenticated,
      departmentClassifier: DepartmentClassifier,
      gladMessage: GladMessage,
      rag: RAG,
      response: Response,
      greetingMessage: GreetingMessage,
      ticketcreation: TicketCreation,
      llm: LLM,
      prompt: Prompt,
      ticketcreated: ticketcreated,
      voiceagent: voiceagent,
      mailagent: mailagent,
      chatagent: chatagent,
    }),
    []
  );

  const handleSaveOrchestration = useCallback(() => {
    const jsonContent = generateOrchestrationJSON(nodes, edges);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orchestration.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert('Orchestration saved as "orchestration.json"');
  }, [nodes, edges]);

  const handleSwitchToBlankFlow = () => {
    setFlowType('blank');
    setNodes(blankNodes);
    setEdges(blankEdges);
    setSelectedNode(null);
    setIsSidebarOpen(false);
  };

  const handleBack = () => {
    setFlowType('default');
    setNodes(defaultNodes);
    setEdges(defaultEdges);
    setSelectedNode(null);
    setIsSidebarOpen(false);
    setShowBackPopup(false);
  };

  const toggleBackPopup = () => {
    setShowBackPopup((prev) => !prev);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <button
        onClick={toggleBackPopup}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: '5px 10px',
          backgroundColor: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          zIndex: 1000,
        }}
      >
        ← Back
      </button>
      <button
        onClick={handleSwitchToBlankFlow}
        style={{
          position: 'absolute',
          top: 10,
          left: 80,
          padding: '5px 10px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          zIndex: 1000,
        }}
      >
        Blank Flow
      </button>
      <button
        onClick={handleSaveOrchestration}
        style={{
          position: 'absolute',
          top: 10,
          right: isSidebarOpen ? 620 : 10,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        Save Orchestration
      </button>
      {showBackPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              width: '300px',
            }}
          >
            <h3>Confirm Navigation</h3>
            <p>Are you sure you want to go back? Unsaved changes will be lost.</p>
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={handleBack}
                style={{
                  padding: '10px 20px',
                  margin: '0 10px',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Back
              </button>
              <button
                onClick={toggleBackPopup}
                style={{
                  padding: '10px 20px',
                  margin: '0 10px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Sidebar
        selectedNode={selectedNode}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        setNodes={setNodes}
        setEdges={setEdges}
        flowType={flowType}
        edges={edges}
        nodes={nodes}
      />
    </div>
  );
};

export default FlowCanvas;
