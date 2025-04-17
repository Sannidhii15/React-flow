// import React, { useState, useEffect } from 'react';
// import { X, PlusCircle, Trash2, Save, Eye, EyeOff, ChevronRight, ChevronDown, HelpCircle } from 'lucide-react';

// const Sidebar = ({ selectedNode, isOpen, toggleSidebar, setNodes, setEdges, edges, nodes, flowType }) => {
//     const sidebarStyle = {
//         width: isOpen ? '600px' : '0',
//         padding: isOpen ? '20px' : '0',
//         position: 'fixed',
//         right: 0,
//         top: 0,
//         height: '100vh',
//         backgroundColor: '#fff',
//         borderLeft: '1px solid #ddd',
//         transition: 'all 0.3s ease',
//         overflowY: 'auto',
//         boxSizing: 'border-box',
//         boxShadow: isOpen ? '-5px 0 15px rgba(0,0,0,0.1)' : 'none',
//     };

//     // State variables
//     const [greetingInput, setGreetingInput] = useState('');
//     const [newDepartment, setNewDepartment] = useState('');
//     const [ticketingSelected, setTicketingSelected] = useState('');
//     const [vectordatabseSelected, setVectordatabseSelected] = useState('');
//     const [authSelected, setAuthSelected] = useState('');
//     const [authUrl, setAuthUrl] = useState('');
//     const [departments, setDepartments] = useState([]);
//     const [newNodeType, setNewNodeType] = useState('');
//     const [previewMode, setPreviewMode] = useState(false);
//     const [expandedSections, setExpandedSections] = useState({
//         details: true,
//         configuration: true,
//         nodeCreation: true,
//     });
//     const [tooltipVisible, setTooltipVisible] = useState(false);
//     const [recentlyUsedNodes, setRecentlyUsedNodes] = useState([]);
//     const [nodeDescription, setNodeDescription] = useState('');
//     const [nodeName, setNodeName] = useState('');
//     const [connectionType, setConnectionType] = useState('standard');
//     const [saveSuccess, setSaveSuccess] = useState(false);

//     // Available node types for creation (aligned with FlowCanvas nodeTypes)
//     const availableNodeTypes = [
//         { type: 'start', label: 'Start', description: 'Entry point of the flow' },
//         { type: 'authenticatedNode', label: 'Authenticated', description: 'Handles authenticated users' },
//         { type: 'notAuthenticatedNode', label: 'Not Authenticated', description: 'Handles unauthenticated users' },
//         { type: 'departmentClassifier', label: 'Department Classifier', description: 'Classifies departments' },
//         { type: 'greetingMessage', label: 'Greeting Message', description: 'Displays a greeting' },
//         { type: 'rag', label: 'RAG', description: 'Retrieval-Augmented Generation' },
//         { type: 'response', label: 'Response', description: 'Formats the final response' },
//         { type: 'ticketcreation', label: 'Ticket Creation', description: 'Creates a support ticket' },
//         { type: 'llm', label: 'LLM', description: 'Language Model processing' },
//         { type: 'prompt', label: 'Prompt', description: 'Captures user input' },
//         { type: 'ticketcreated', label: 'Ticket Created', description: 'Confirms ticket creation' },
//         { type: 'voiceagent', label: 'Voice Agent', description: 'Handles voice interactions' },
//         { type: 'mailagent', label: 'Mail Agent', description: 'Handles email interactions' },
//         { type: 'chatagent', label: 'Chat Agent', description: 'Handles chat interactions' },
//         { type: 'gladMessage', label: 'Glad Message', description: 'Displays a positive message' },
//     ];

//     useEffect(() => {
//         if (selectedNode) {
//             setGreetingInput(selectedNode.data?.greeting || '');
//             setNewDepartment(selectedNode.data?.newDepartment || '');
//             setTicketingSelected(selectedNode.data?.ticketingSelected || 'ServiceNow');
//             setAuthSelected(selectedNode.data?.authSelected || 'Azure');
//             setAuthUrl(selectedNode.data?.authUrl || '');
//             setVectordatabseSelected(selectedNode.data?.vectorDatabaseSelected || 'Milvus');
//             setDepartments(selectedNode.data?.departments || []);
//             setNodeDescription(selectedNode.data?.description || selectedNode.description || '');
//             setNodeName(selectedNode.data?.name || selectedNode.name || '');
//         }
//     }, [selectedNode]);

//     const updateNodeData = (nodeId, newData) => {
//         if (!nodeId) return; // Safeguard against undefined nodeId
//         setNodes((nds) =>
//             nds.map((node) => {
//                 if (node.id === nodeId) {
//                     // Create updated node with proper label handling
//                     const updatedNode = {
//                         ...node,
//                         data: {
//                             ...node.data,
//                             ...newData,
//                             label: newData.name || node.data.label, // Update label in data
//                             name: newData.name || node.data.name, // Ensure name is also updated
//                         },
//                     };

//                     // If this is a name change, also handle it at the node level for components that use node.name
//                     if (newData.name) {
//                         updatedNode.name = newData.name;
//                     }

//                     return updatedNode;
//                 }
//                 return node;
//             })
//         );

//         setSaveSuccess(true);
//         setTimeout(() => setSaveSuccess(false), 1500);
//     };

//     const handleTicketingChange = (e) => {
//         if (!selectedNode) return;
//         const value = e.target.value;
//         setTicketingSelected(value);
//         updateNodeData(selectedNode.id, { ticketingSelected: value });
//     };

//     const handleVectordatabseChange = (e) => {
//         if (!selectedNode) return;
//         const value = e.target.value;
//         setVectordatabseSelected(value);
//         updateNodeData(selectedNode.id, { vectorDatabaseSelected: value });
//     };

//     const handleAuthChange = (e) => {
//         if (!selectedNode) return;
//         const value = e.target.value;
//         setAuthSelected(value);
//         updateNodeData(selectedNode.id, { authSelected: value });
//     };

//     const handleAuthUrlChange = (e) => {
//         if (!selectedNode) return;
//         const value = e.target.value;
//         setAuthUrl(value);
//         updateNodeData(selectedNode.id, { authUrl: value });
//     };

//     const handleAddDepartment = () => {
//         if (!selectedNode || !newDepartment.trim()) return;
//         const updatedDepartments = [...departments, newDepartment.trim()];
//         setDepartments(updatedDepartments);
//         updateNodeData(selectedNode.id, {
//             departments: updatedDepartments,
//             newDepartment: '',
//         });
//         setNewDepartment('');
//     };

//     const handleRemoveDepartment = (index) => {
//         if (!selectedNode) return;
//         const updatedDepartments = departments.filter((_, i) => i !== index);
//         setDepartments(updatedDepartments);
//         updateNodeData(selectedNode.id, { departments: updatedDepartments });
//     };

//     const handleNameChange = (e) => {
//         if (!selectedNode) return;
//         const value = e.target.value;
//         setNodeName(value);
//         updateNodeData(selectedNode.id, {
//             name: value,
//             label: value,
//         });
//     };

//     const handleDescriptionChange = (e) => {
//         if (!selectedNode) return;
//         const value = e.target.value;
//         setNodeDescription(value);
//         updateNodeData(selectedNode.id, { description: value });
//     };

//     const handleSaveNodeDetails = () => {
//         if (!selectedNode) return;
//         updateNodeData(selectedNode.id, {
//             name: nodeName,
//             label: nodeName, // Ensure label is updated for react-flow
//             description: nodeDescription,
//         });
//     }

//     const handleAddNewNode = () => {
//         if (!newNodeType) return;

//         const selectedNodeType = availableNodeTypes.find((n) => n.type === newNodeType);
//         if (!selectedNodeType) return;

//         const newNodeId = `${newNodeType}-${Date.now()}`;
//         const newNode = {
//             id: newNodeId,
//             type: newNodeType,
//             position: selectedNode
//                 ? { x: selectedNode.position.x + 300, y: selectedNode.position.y }
//                 : { x: 0, y: 0 },
//             data: {
//                 name: selectedNodeType.label,
//                 label: selectedNodeType.label,
//                 description: selectedNodeType.description,
//                 predefinedJson: `${newNodeType}Node.json`,
//                 greeting: '',
//                 departments: [],
//                 onOptions: selectedNode?.data?.onOptions || (() => { }),
//             },
//         };

//         setNodes((nds) => [...nds, newNode]);

//         if (selectedNode) {
//             setEdges((eds) => [
//                 ...eds,
//                 {
//                     id: `e-${selectedNode.id}-${newNodeId}`,
//                     source: selectedNode.id,
//                     target: newNodeId,
//                     type: connectionType === 'conditional' ? 'conditionalEdge' : 'default',
//                     animated: connectionType === 'animated',
//                     style: { stroke: connectionType === 'highlighted' ? '#ff9900' : '#aaa' },
//                 },
//             ]);
//         }

//         setRecentlyUsedNodes((prev) => [newNodeType, ...prev.filter((type) => type !== newNodeType)].slice(0, 3));
//         setNewNodeType('');
//     };

//     const toggleSection = (section) => {
//         setExpandedSections({
//             ...expandedSections,
//             [section]: !expandedSections[section],
//         });
//     };

//     const renderNodeSpecificControls = () => {
//         if (!selectedNode) return null;

//         switch (selectedNode.type) {
//             case 'greetingMessage':
//                 return (
//                     <div className="node-control-group">
//                         <h4>Greeting Message</h4>
//                         <textarea
//                             value={greetingInput}
//                             onChange={handleGreetingChange}
//                             placeholder="Enter greeting message"
//                             style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '80px' }}
//                         />
//                         {previewMode && greetingInput && (
//                             <div className="preview-box" style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
//                                 <h5>Preview:</h5>
//                                 <p>{greetingInput}</p>
//                             </div>
//                         )}
//                     </div>
//                 );
//             case 'departmentClassifier':
//                 return (
//                     <div className="node-control-group">
//                         <h4>Departments & Edge Labels</h4>

//                         {/* List of existing departments */}
//                         <div style={{ marginBottom: '15px' }}>
//                             {departments.length === 0 ? (
//                                 <p style={{ color: '#666', fontStyle: 'italic' }}>No departments added yet.</p>
//                             ) : (
//                                 <ul style={{ listStyleType: 'none', padding: 0 }}>
//                                     {departments.map((dept, index) => (
//                                         <li
//                                             key={index}
//                                             style={{
//                                                 display: 'flex',
//                                                 justifyContent: 'space-between',
//                                                 alignItems: 'center',
//                                                 padding: '8px',
//                                                 marginBottom: '8px',
//                                                 backgroundColor: '#f5f7fa',
//                                                 borderRadius: '4px',
//                                                 border: '1px solid #e1e4e8',
//                                             }}
//                                         >
//                                             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                                                 <span style={{ fontWeight: 'bold' }}>{dept}</span>
//                                                 <span style={{ fontSize: '12px', color: '#666' }}>
//                                                     (Edge Label: {dept})
//                                                 </span>
//                                             </div>
//                                             <button
//                                                 onClick={() => handleRemoveDepartment(index)}
//                                                 style={{
//                                                     background: 'none',
//                                                     border: 'none',
//                                                     cursor: 'pointer',
//                                                     color: '#e53e3e',
//                                                 }}
//                                             >
//                                                 <Trash2 size={16} />
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </div>

//                         {/* Add new department (which will auto-set edge label) */}
//                         <div style={{ display: 'flex', marginBottom: '15px' }}>
//                             <input
//                                 type="text"
//                                 value={newDepartment}
//                                 onChange={(e) => setNewDepartment(e.target.value)}
//                                 placeholder="New department name (will be edge label)"
//                                 style={{
//                                     flex: 1,
//                                     padding: '10px',
//                                     marginRight: '10px',
//                                     borderRadius: '4px',
//                                     border: '1px solid #ddd',
//                                 }}
//                                 onKeyPress={(e) => e.key === 'Enter' && handleAddDepartment()}
//                             />
//                             <button
//                                 onClick={handleAddDepartment}
//                                 disabled={!newDepartment.trim() || departments.includes(newDepartment.trim())}
//                                 style={{
//                                     padding: '10px 15px',
//                                     backgroundColor: '#3182ce',
//                                     color: 'white',
//                                     border: 'none',
//                                     borderRadius: '4px',
//                                     cursor: 'pointer',
//                                     opacity: !newDepartment.trim() || departments.includes(newDepartment.trim()) ? 0.5 : 1,
//                                 }}
//                             >
//                                 <PlusCircle size={16} /> Add
//                             </button>
//                         </div>

//                         {/* Show connected edges and their labels */}
//                         <div style={{ marginTop: '20px' }}>
//                             <h5>Connected Edges</h5>
//                             {edges
//                                 .filter(edge => edge.source === selectedNode.id)
//                                 .map(edge => (
//                                     <div
//                                         key={edge.id}
//                                         style={{
//                                             padding: '8px',
//                                             marginBottom: '8px',
//                                             backgroundColor: '#f0f4f8',
//                                             borderRadius: '4px',
//                                             fontSize: '14px',
//                                         }}
//                                     >
//                                         <strong>→ {nodes.find(n => n.id === edge.target)?.type || 'Node'}</strong>
//                                         <div style={{ color: '#555' }}>
//                                             Edge Label: <code>{edge.label || '(none)'}</code>
//                                         </div>
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                     </div>
//                 );

//             case 'rag':
//                 return (
//                     <div className="node-control-group">
//                         <h4>Select Vector Database System</h4>
//                         <select
//                             value={vectordatabseSelected}
//                             onChange={handleVectordatabseChange}
//                             style={{
//                                 width: '100%',
//                                 padding: '10px',
//                                 borderRadius: '4px',
//                                 border: '1px solid #ddd',
//                                 marginBottom: '15px',
//                             }}
//                         >
//                             <option value="Milvus">Milvus</option>
//                             <option value="Faiss">Faiss</option>
//                             <option value="Pinecone">Pinecone</option>
//                             <option value="Weaviate">Weaviate</option>
//                             <option value="Qdrant">Qdrant</option>
//                         </select>
//                         <h4>Query Configuration</h4>
//                         <div style={{ marginBottom: '10px' }}>
//                             <label style={{ display: 'block', marginBottom: '5px' }}>Top K Results</label>
//                             <input
//                                 type="number"
//                                 min="1"
//                                 max="100"
//                                 defaultValue="5"
//                                 style={{
//                                     width: '100%',
//                                     padding: '10px',
//                                     borderRadius: '4px',
//                                     border: '1px solid #ddd',
//                                 }}
//                             />
//                         </div>

//                     </div>
//                 );
//             case 'llm':
//                 return (
//                     <div className="node-control-group">
//                         <h4>LLM Configuration</h4>
//                         <div style={{ marginBottom: '15px' }}>
//                             <label style={{ display: 'block', marginBottom: '5px' }}>Model</label>
//                             <select
//                                 defaultValue="gpt-4"
//                                 style={{
//                                     width: '100%',
//                                     padding: '10px',
//                                     borderRadius: '4px',
//                                     border: '1px solid #ddd',
//                                 }}
//                             >
//                                 <option value="gpt-4">GPT-4</option>
//                                 <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
//                                 <option value="claude-3-opus">Claude 3 Opus</option>
//                                 <option value="claude-3-sonnet">Claude 3 Sonnet</option>
//                                 <option value="llama-3">Llama 3</option>
//                             </select>
//                         </div>
//                         <div style={{ marginBottom: '15px' }}>
//                             <label style={{ display: 'block', marginBottom: '5px' }}>System Prompt</label>
//                             <textarea
//                                 placeholder="Enter system prompt..."
//                                 style={{
//                                     width: '100%',
//                                     padding: '10px',
//                                     borderRadius: '4px',
//                                     border: '1px solid #ddd',
//                                     minHeight: '100px',
//                                 }}
//                                 defaultValue="You are a helpful AI assistant that specializes in customer support."
//                             />
//                         </div>

//                     </div>
//                 );
//             case 'voiceagent':
//             case 'mailagent':
//             case 'chatagent':
//                 return (
//                     <div className="node-control-group">
//                         <h4>{selectedNode.type.replace('agent', ' Agent')} Configuration</h4>
//                         <div style={{
//                             padding: '15px',
//                             backgroundColor: '#f8f9fa',
//                             borderRadius: '5px',
//                             border: '1px dashed #ccc',
//                             marginBottom: '15px',
//                         }}>
//                             <p style={{ margin: '0', fontStyle: 'italic' }}>
//                                 Advanced configuration options are coming soon. Check back for updates!
//                             </p>
//                         </div>
//                         <div style={{ marginBottom: '15px' }}>
//                             <label style={{ display: 'block', marginBottom: '5px' }}>Agent Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter agent name"
//                                 defaultValue={selectedNode.type.replace('agent', ' Support Agent')}
//                                 style={{
//                                     width: '100%',
//                                     padding: '10px',
//                                     borderRadius: '4px',
//                                     border: '1px solid #ddd',
//                                 }}
//                             />
//                         </div>
//                         <div style={{ marginBottom: '15px' }}>
//                             <label style={{ display: 'block', marginBottom: '5px' }}>Response Template</label>
//                             <textarea
//                                 placeholder="Enter default response template..."
//                                 style={{
//                                     width: '100%',
//                                     padding: '10px',
//                                     borderRadius: '4px',
//                                     border: '1px solid #ddd',
//                                     minHeight: '80px',
//                                 }}
//                                 defaultValue={
//                                     selectedNode.type === 'voiceagent'
//                                         ? "Hello, this is [Agent Name]. How may I assist you today?"
//                                         : "Thank you for contacting us. Your request has been received and will be addressed shortly."
//                                 }
//                             />
//                         </div>
//                     </div>
//                 );
//             default:
//                 return (
//                     <div className="node-control-group">
//                         <h4>Node Configuration</h4>
//                         <p>Generic configuration for {selectedNode.type}</p>
//                     </div>
//                 );
//         }
//     };

//     const renderNodeTooltip = () => {
//         if (!tooltipVisible || !newNodeType) return null;

//         const selectedNodeType = availableNodeTypes.find((n) => n.type === newNodeType);
//         const tooltipText = selectedNodeType?.description || 'Select a node type for more information';

//         return (
//             <div style={{
//                 position: 'absolute',
//                 bottom: '120px',
//                 left: '20px',
//                 right: '20px',
//                 backgroundColor: '#f8f9fa',
//                 border: '1px solid #ddd',
//                 borderRadius: '5px',
//                 padding: '10px',
//                 zIndex: 100,
//                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//             }}>
//                 <h4 style={{ margin: '0 0 8px 0' }}>About this node type</h4>
//                 <p style={{ margin: '0' }}>{tooltipText}</p>
//             </div>
//         );
//     };

//     return (
//         <>
//             <div className="sidebar" style={sidebarStyle}>
//                 {isOpen && (
//                     <>
//                         {/* Sidebar Header */}
//                         <div style={{
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             marginBottom: '20px',
//                             borderBottom: '1px solid #eee',
//                             paddingBottom: '10px',
//                         }}>
//                             <h2 style={{ margin: '0' }}>Node Editor</h2>
//                             <div style={{ display: 'flex', gap: '10px' }}>
//                                 <button
//                                     onClick={() => setPreviewMode(!previewMode)}
//                                     style={{
//                                         background: 'none',
//                                         border: 'none',
//                                         cursor: 'pointer',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         fontSize: '14px',
//                                         color: previewMode ? '#3182ce' : '#718096',
//                                     }}
//                                     title={previewMode ? 'Hide Preview' : 'Show Preview'}
//                                 >
//                                     {previewMode ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                                 <button
//                                     onClick={toggleSidebar}
//                                     style={{
//                                         background: 'none',
//                                         border: 'none',
//                                         cursor: 'pointer',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                     }}
//                                     title="Close Sidebar"
//                                 >
//                                     <X size={20} />
//                                 </button>
//                             </div>
//                         </div>

//                         {selectedNode ? (
//                             <>
//                                 {/* Node Details Section */}
//                                 <div className="section" style={{ marginBottom: '20px' }}>
//                                     <div
//                                         style={{
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             cursor: 'pointer',
//                                             padding: '5px',
//                                             marginBottom: '10px',
//                                             backgroundColor: '#f7fafc',
//                                             borderRadius: '4px',
//                                         }}
//                                         onClick={() => toggleSection('details')}
//                                     >
//                                         {expandedSections.details ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                                         <h3 style={{ margin: '0 0 0 5px' }}>Node Details</h3>
//                                     </div>

//                                     {expandedSections.details && (
//                                         <>
//                                             <div style={{ marginBottom: '15px' }}>
//                                                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Node Name</label>
//                                                 <input
//                                                     type="text"
//                                                     value={nodeName}
//                                                     onChange={handleNameChange}
//                                                     style={{
//                                                         width: '100%',
//                                                         padding: '10px',
//                                                         borderRadius: '4px',
//                                                         border: '1px solid #ddd',
//                                                     }}
//                                                 />
//                                             </div>
//                                             <div style={{ marginBottom: '15px' }}>
//                                                 <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
//                                                 <textarea
//                                                     value={nodeDescription}
//                                                     onChange={handleDescriptionChange}
//                                                     style={{
//                                                         width: '100%',
//                                                         padding: '10px',
//                                                         borderRadius: '4px',
//                                                         border: '1px solid #ddd',
//                                                         minHeight: '80px',
//                                                     }}
//                                                 />
//                                             </div>
//                                             <div style={{
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 backgroundColor: '#EDF2F7',
//                                                 padding: '10px',
//                                                 borderRadius: '5px',
//                                                 marginBottom: '15px',
//                                             }}>
//                                                 <span style={{ marginRight: '10px' }}>Node Type:</span>
//                                                 <span style={{
//                                                     backgroundColor: '#3182ce',
//                                                     color: 'white',
//                                                     padding: '3px 8px',
//                                                     borderRadius: '20px',
//                                                     fontSize: '14px',
//                                                 }}>
//                                                     {selectedNode.type}
//                                                 </span>
//                                             </div>
//                                             {/* Save Button */}
//                                             <button
//                                                 onClick={handleSaveNodeDetails}
//                                                 style={{
//                                                     padding: '10px 15px',
//                                                     fontSize: '14px',
//                                                     fontWeight: 'bold',
//                                                     cursor: 'pointer',
//                                                     backgroundColor: '#3182ce',
//                                                     color: 'white',
//                                                     border: 'none',
//                                                     borderRadius: '4px',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     gap: '5px',
//                                                     width: '100%',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <Save size={18} /> Save Node Details
//                                             </button>
//                                             {saveSuccess && (
//                                                 <div style={{
//                                                     marginTop: '10px',
//                                                     color: '#38a169',
//                                                     textAlign: 'center',
//                                                 }}>
//                                                     Saved successfully!
//                                                 </div>
//                                             )}
//                                         </>
//                                     )}
//                                 </div>

//                                 {/* Node Configuration Section */}
//                                 <div className="section" style={{ marginBottom: '20px' }}>
//                                     <div
//                                         style={{
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             cursor: 'pointer',
//                                             padding: '5px',
//                                             marginBottom: '10px',
//                                             backgroundColor: '#f7fafc',
//                                             borderRadius: '4px',
//                                         }}
//                                         onClick={() => toggleSection('configuration')}
//                                     >
//                                         {expandedSections.configuration ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
//                                         <h3 style={{ margin: '0 0 0 5px' }}>Node Configuration</h3>
//                                     </div>

//                                     {expandedSections.configuration && renderNodeSpecificControls()}
//                                 </div>
//                             </>
//                         ) : (
//                             <div style={{
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 height: '50%',
//                                 color: '#718096',
//                                 textAlign: 'center',
//                                 padding: '0 20px',
//                             }}>
//                                 <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>⚙️</div>
//                                 <h3>No Node Selected</h3>
//                                 <p>Select a node from the canvas to edit its properties or add a new node above</p>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>

//             {/* Quick Access Floating Button */}
//             {!isOpen && (
//                 <button
//                     onClick={toggleSidebar}
//                     style={{
//                         position: 'fixed',
//                         right: '20px',
//                         bottom: '20px',
//                         width: '50px',
//                         height: '50px',
//                         borderRadius: '50%',
//                         backgroundColor: '#3182ce',
//                         color: 'white',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         border: 'none',
//                         cursor: 'pointer',
//                         boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//                         zIndex: 100,
//                     }}
//                 >
//                     <ChevronRight size={24} />
//                 </button>
//             )}
//         </>
//     );
// };

// export default Sidebar;

import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Trash2, Save, Eye, EyeOff, ChevronRight, ChevronDown } from 'lucide-react';

const Sidebar = ({ selectedNode, isOpen, toggleSidebar, setNodes, setEdges, edges, nodes, flowType }) => {
  const sidebarStyle = {
    width: isOpen ? '600px' : '0',
    padding: isOpen ? '20px' : '0',
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100vh',
    backgroundColor: '#fff',
    borderLeft: '1px solid #ddd',
    transition: 'all 0.3s ease',
    overflowY: 'auto',
    boxSizing: 'border-box',
    boxShadow: isOpen ? '-5px 0 15px rgba(0,0,0,0.1)' : 'none',
  };

  // State variables
  const [greetingInput, setGreetingInput] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [ticketingSelected, setTicketingSelected] = useState('');
  const [vectordatabseSelected, setVectordatabseSelected] = useState('');
  const [authSelected, setAuthSelected] = useState('');
  const [authUrl, setAuthUrl] = useState('');
  const [departments, setDepartments] = useState([]);
  const [newNodeType, setNewNodeType] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    configuration: true,
    nodeCreation: true,
  });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [recentlyUsedNodes, setRecentlyUsedNodes] = useState([]);
  const [nodeDescription, setNodeDescription] = useState('');
  const [nodeName, setNodeName] = useState('');
  const [connectionType, setConnectionType] = useState('standard');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [edgeUpdateSuccess, setEdgeUpdateSuccess] = useState(false);

  // Available node types
  const availableNodeTypes = [
    { type: 'start', label: 'Start', description: 'Entry point of the flow' },
    { type: 'authenticatedNode', label: 'Authenticated', description: 'Handles authenticated users' },
    { type: 'notAuthenticatedNode', label: 'Not Authenticated', description: 'Handles unauthenticated users' },
    { type: 'departmentClassifier', label: 'Department Classifier', description: 'Classifies departments' },
    { type: 'greetingMessage', label: 'Greeting Message', description: 'Displays a greeting' },
    { type: 'rag', label: 'RAG', description: 'Retrieval-Augmented Generation' },
    { type: 'response', label: 'Response', description: 'Formats the final response' },
    { type: 'ticketcreation', label: 'Ticket Creation', description: 'Creates a support ticket' },
    { type: 'llm', label: 'LLM', description: 'Language Model processing' },
    { type: 'prompt', label: 'Prompt', description: 'Captures user input' },
    { type: 'ticketcreated', label: 'Ticket Created', description: 'Confirms ticket creation' },
    { type: 'voiceagent', label: 'Voice Agent', description: 'Handles voice interactions' },
    { type: 'mailagent', label: 'Mail Agent', description: 'Handles email interactions' },
    { type: 'chatagent', label: 'Chat Agent', description: 'Handles chat interactions' },
    { type: 'gladMessage', label: 'Glad Message', description: 'Displays a positive message' },
  ];

  useEffect(() => {
    if (selectedNode) {
      setGreetingInput(selectedNode.data?.greeting || '');
      setNewDepartment(selectedNode.data?.newDepartment || '');
      setTicketingSelected(selectedNode.data?.ticketingSelected || 'ServiceNow');
      setAuthSelected(selectedNode.data?.authSelected || 'Azure');
      setAuthUrl(selectedNode.data?.authUrl || '');
      setVectordatabseSelected(selectedNode.data?.vectorDatabaseSelected || 'Milvus');
      setDepartments(selectedNode.data?.departments || []);
      setNodeDescription(selectedNode.data?.description || selectedNode.description || '');
      setNodeName(selectedNode.data?.name || selectedNode.name || '');
    }
  }, [selectedNode]);

  const updateNodeData = (nodeId, newData) => {
    if (!nodeId) return;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: {
              ...node.data,
              ...newData,
              label: newData.name || node.data.label,
              name: newData.name || node.data.name,
            },
          };
          if (newData.name) {
            updatedNode.name = newData.name;
          }
          return updatedNode;
        }
        return node;
      })
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 1500);
  };

  const handleAddDepartment = () => {
    if (!selectedNode || !newDepartment.trim()) return;

    const updatedDepartments = [...departments, newDepartment.trim()];
    setDepartments(updatedDepartments);
    updateNodeData(selectedNode.id, {
      departments: updatedDepartments,
      newDepartment: '',
    });

    // Find the most recent node connected to this departmentClassifier
    const targetNodes = edges
      .filter((edge) => edge.source === selectedNode.id)
      .map((edge) => nodes.find((node) => node.id === edge.target))
      .filter((node) => node)
      .sort((a, b) => parseInt(b.id) - parseInt(a.id)); // Sort by node ID (assuming timestamp-based)

    if (targetNodes.length > 0) {
      const latestNode = targetNodes[0];
      const edgeId = latestNode.data.createdEdgeId;
      console.log(`Attempting to update edge ID: ${edgeId} with department: ${newDepartment}`);

      if (edgeId) {
        setEdges((eds) =>
          eds.map((edge) => {
            if (edge.id === edgeId) {
              console.log(`Updating edge ${edge.id} label to ${newDepartment.trim()}`);
              return {
                ...edge,
                label: newDepartment.trim(),
                data: { ...edge.data, department: newDepartment.trim() },
              };
            }
            return edge;
          })
        );
        setEdgeUpdateSuccess(true);
        setTimeout(() => setEdgeUpdateSuccess(false), 1500);
      } else {
        console.warn(`No createdEdgeId found for node ${latestNode.id}`);
      }
    } else {
      console.warn(`No target nodes found for departmentClassifier ${selectedNode.id}`);
    }

    setNewDepartment('');
  };

  const handleRemoveDepartment = (index) => {
    if (!selectedNode) return;
    const departmentToRemove = departments[index];
    const updatedDepartments = departments.filter((_, i) => i !== index);
    setDepartments(updatedDepartments);
    updateNodeData(selectedNode.id, { departments: updatedDepartments });

    // Find and reset the edge label for the removed department
    const sourceEdge = edges.find(
      (edge) => edge.source === selectedNode.id && edge.label === departmentToRemove
    );
    if (sourceEdge) {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === sourceEdge.id) {
            console.log(`Resetting edge ${edge.id} label to 'default'`);
            return {
              ...edge,
              label: 'default',
              data: { ...edge.data, department: 'default' },
            };
          }
          return edge;
        })
      );
    }
  };

  const handleTicketingChange = (e) => {
    if (!selectedNode) return;
    const value = e.target.value;
    setTicketingSelected(value);
    updateNodeData(selectedNode.id, { ticketingSelected: value });
  };

  const handleVectordatabseChange = (e) => {
    if (!selectedNode) return;
    const value = e.target.value;
    setVectordatabseSelected(value);
    updateNodeData(selectedNode.id, { vectorDatabaseSelected: value });
  };

  const handleAuthChange = (e) => {
    if (!selectedNode) return;
    const value = e.target.value;
    setAuthSelected(value);
    updateNodeData(selectedNode.id, { authSelected: value });
  };

  const handleAuthUrlChange = (e) => {
    if (!selectedNode) return;
    const value = e.target.value;
    setAuthUrl(value);
    updateNodeData(selectedNode.id, { authUrl: value });
  };

  const handleNameChange = (e) => {
    if (!selectedNode) return;
    const value = e.target.value;
    setNodeName(value);
    updateNodeData(selectedNode.id, {
      name: value,
      label: value,
    });
  };

  const handleDescriptionChange = (e) => {
    if (!selectedNode) return;
    const value = e.target.value;
    setNodeDescription(value);
    updateNodeData(selectedNode.id, { description: value });
  };

  const handleSaveNodeDetails = () => {
    if (!selectedNode) return;
    updateNodeData(selectedNode.id, {
      name: nodeName,
      label: nodeName,
      description: nodeDescription,
    });
  };

  const handleAddNewNode = () => {
    if (!newNodeType) return;

    const selectedNodeType = availableNodeTypes.find((n) => n.type === newNodeType);
    if (!selectedNodeType) return;

    const newNodeId = `${newNodeType}-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: newNodeType,
      position: selectedNode
        ? { x: selectedNode.position.x + 300, y: selectedNode.position.y }
        : { x: 0, y: 0 },
      data: {
        name: selectedNodeType.label,
        label: selectedNodeType.label,
        description: selectedNodeType.description,
        predefinedJson: `${newNodeType}Node.json`,
        greeting: '',
        departments: [],
        onOptions: selectedNode?.data?.onOptions || (() => { }),
      },
    };

    setNodes((nds) => [...nds, newNode]);

    if (selectedNode) {
      setEdges((eds) => [
        ...eds,
        {
          id: `e-${selectedNode.id}-${newNodeId}`,
          source: selectedNode.id,
          target: newNodeId,
          type: connectionType === 'conditional' ? 'conditionalEdge' : 'default',
          animated: connectionType === 'animated',
          style: { stroke: connectionType === 'highlighted' ? '#ff9900' : '#aaa' },
          label: selectedNode.type === 'departmentClassifier' ? 'default' : undefined,
          data: selectedNode.type === 'departmentClassifier' ? { department: 'default' } : undefined,
        },
      ]);
    }

    setRecentlyUsedNodes((prev) => [newNodeType, ...prev.filter((type) => type !== newNodeType)].slice(0, 3));
    setNewNodeType('');
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const renderNodeSpecificControls = () => {
    if (!selectedNode) return null;

    switch (selectedNode.type) {
      case 'departmentClassifier':
        return (
          <div className="node-control-group">
            <h4>Departments & Edge Labels</h4>

            {/* List of existing departments */}
            <div style={{ marginBottom: '15px' }}>
              {departments.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No departments added yet.</p>
              ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {departments.map((dept, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px',
                        marginBottom: '8px',
                        backgroundColor: '#f5f7fa',
                        borderRadius: '4px',
                        border: '1px solid #e1e4e8',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 'bold' }}>{dept}</span>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          (Edge Label: {dept})
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveDepartment(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#e53e3e',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Add new department (which will auto-set edge label) */}
            <div style={{ display: 'flex', marginBottom: '15px' }}>
              <input
                type="text"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                placeholder="New department name (will be edge label)"
                style={{
                  flex: 1,
                  padding: '10px',
                  marginRight: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleAddDepartment()}
              />
              <button
                onClick={handleAddDepartment}
                disabled={!newDepartment.trim() || departments.includes(newDepartment.trim())}
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#3182ce',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  opacity: !newDepartment.trim() || departments.includes(newDepartment.trim()) ? 0.5 : 1,
                }}
              >
                <PlusCircle size={16} /> Add
              </button>
            </div>

            {/* Show success message for edge update */}
            {edgeUpdateSuccess && (
              <div style={{ marginBottom: '15px', color: '#38a169', textAlign: 'center' }}>
                Edge label updated successfully!
              </div>
            )}

          </div>
        );

      case 'authenticatedNode':
      case 'notAuthenticatedNode':
        return (
          <div className="node-control-group">
            <h4>Select Identity Provider</h4>
            <select
              value={authSelected}
              onChange={handleAuthChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                marginBottom: '10px',
              }}
            >
              <option value="Azure">Azure AD</option>
              <option value="Google">Google</option>
              <option value="Okta">Okta</option>
              <option value="Auth0">Auth0</option>
              <option value="AWS">AWS Cognito</option>
            </select>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Identity Provider URL
              </label>
              <input
                type="url"
                value={authUrl}
                onChange={handleAuthUrlChange}
                placeholder={`Enter ${authSelected || 'provider'} URL`}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
            <button
              onClick={async () => {
                if (selectedNode && authSelected && authUrl) {
                  try {
                    const response = await fetch('http://127.0.0.1:5100/api/get-uri', {
                      method: 'POST', // Use POST since you're sending data
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        integrationType: authSelected,
                        integrationUri: authUrl,
                      }),
                    });

                    const result = await response.json();

                    if (response.ok) {
                      // Update local node data after successful save
                      updateNodeData(selectedNode.id, {
                        authSelected,
                        authUrl,
                        redirectUri: result.redirectUri || '', // Store redirect URI if returned
                      });
                      alert('Authentication details saved successfully!');
                    } else {
                      alert(`Error: ${result.error}`);
                    }
                  } catch (error) {
                    alert(`Failed to save: ${error.message}`);
                  }
                } else {
                  alert('Please select an authentication provider and enter a valid URL.');
                }
              }}
              style={{
                padding: '10px 15px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Save size={18} /> Save
            </button>
          </div>
        );

      case 'ticketcreation':
        return (
          <div className="node-control-group">
            <h4>Select Ticketing System</h4>
            <select
              value={ticketingSelected}
              onChange={handleTicketingChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                marginBottom: '10px',
              }}
            >
              <option value="ServiceNow">ServiceNow</option>
              <option value="Jira">Jira</option>
              <option value="Zendesk">Zendesk</option>
              <option value="Freshdesk">Freshdesk</option>
              <option value="Custom">Custom</option>
            </select>
            {ticketingSelected === 'Custom' && (
              <input
                type="text"
                placeholder="Enter custom ticketing system"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            )}
          </div>
        );

      case 'greetingMessage':
        return (
          <div className="node-control-group">
            <h4>Greeting Message</h4>
            <textarea
              value={greetingInput}
              onChange={(e) => {
                setGreetingInput(e.target.value);
                updateNodeData(selectedNode.id, { greeting: e.target.value });
              }}
              placeholder="Enter greeting message"
              style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '80px' }}
            />
            {previewMode && greetingInput && (
              <div className="preview-box" style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                <h5>Preview:</h5>
                <p>{greetingInput}</p>
              </div>
            )}
          </div>
        );
      case 'rag':
        return (
          <div className="node-control-group">
            <h4>Select Vector Database System</h4>
            <select
              value={vectordatabseSelected}
              onChange={handleVectordatabseChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                marginBottom: '15px',
              }}
            >
              <option value="Milvus">Milvus</option>
              <option value="Faiss">Faiss</option>
              <option value="Pinecone">Pinecone</option>
              <option value="Weaviate">Weaviate</option>
              <option value="Qdrant">Qdrant</option>
            </select>
            <h4>Query Configuration</h4>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Top K Results</label>
              <input
                type="number"
                min="1"
                max="100"
                defaultValue="5"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
          </div>
        );
      case 'llm':
        return (
          <div className="node-control-group">
            <h4>LLM Configuration</h4>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Model</label>
              <select
                defaultValue="gpt-4"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                <option value="llama-3">Llama 3</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>System Prompt</label>
              <textarea
                placeholder="Enter system prompt..."
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  minHeight: '100px',
                }}
                defaultValue="You are a helpful AI assistant that specializes in customer support."
              />
            </div>
          </div>
        );
      case 'voiceagent':
      case 'mailagent':
      case 'chatagent':
        return (
          <div className="node-control-group">
            <h4>{selectedNode.type.replace('agent', ' Agent')} Configuration</h4>
            <div style={{
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '5px',
              border: '1px dashed #ccc',
              marginBottom: '15px',
            }}>
              <p style={{ margin: '0', fontStyle: 'italic' }}>
                Advanced configuration options are coming soon. Check back for updates!
              </p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Agent Name</label>
              <input
                type="text"
                placeholder="Enter agent name"
                defaultValue={selectedNode.type.replace('agent', ' Support Agent')}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Response Template</label>
              <textarea
                placeholder="Enter default response template..."
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  minHeight: '80px',
                }}
                defaultValue={
                  selectedNode.type === 'voiceagent'
                    ? "Hello, this is [Agent Name]. How may I assist you today?"
                    : "Thank you for contacting us. Your request has been received and will be addressed shortly."
                }
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="node-control-group">
            <h4>Node Configuration</h4>
            <p>Generic configuration for {selectedNode.type}</p>
          </div>
        );
    }
  };

  const renderNodeTooltip = () => {
    if (!tooltipVisible || !newNodeType) return null;

    const selectedNodeType = availableNodeTypes.find((n) => n.type === newNodeType);
    const tooltipText = selectedNodeType?.description || 'Select a node type for more information';

    return (
      <div style={{
        position: 'absolute',
        bottom: '120px',
        left: '20px',
        right: '20px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '10px',
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <h4 style={{ margin: '0 0 8px 0' }}>About this node type</h4>
        <p style={{ margin: '0' }}>{tooltipText}</p>
      </div>
    );
  };

  return (
    <>
      <div className="sidebar" style={sidebarStyle}>
        {isOpen && (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid #eee',
              paddingBottom: '10px',
            }}>
              <h2 style={{ margin: '0' }}>Node Editor</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: previewMode ? '#3182ce' : '#718096',
                  }}
                  title={previewMode ? 'Hide Preview' : 'Show Preview'}
                >
                  {previewMode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <button
                  onClick={toggleSidebar}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Close Sidebar"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {selectedNode ? (
              <>
                <div className="section" style={{ marginBottom: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: '5px',
                      marginBottom: '10px',
                      backgroundColor: '#f7fafc',
                      borderRadius: '4px',
                    }}
                    onClick={() => toggleSection('details')}
                  >
                    {expandedSections.details ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    <h3 style={{ margin: '0 0 0 5px' }}>Node Details</h3>
                  </div>

                  {expandedSections.details && (
                    <>
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Node Name</label>
                        <input
                          type="text"
                          value={nodeName}
                          onChange={handleNameChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                        <textarea
                          value={nodeDescription}
                          onChange={handleDescriptionChange}
                          style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            minHeight: '80px',
                          }}
                        />
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#EDF2F7',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '15px',
                      }}>
                        <span style={{ marginRight: '10px' }}>Node Type:</span>
                        <span style={{
                          backgroundColor: '#3182ce',
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '20px',
                          fontSize: '14px',
                        }}>
                          {selectedNode.type}
                        </span>
                      </div>
                      <button
                        onClick={handleSaveNodeDetails}
                        style={{
                          padding: '10px 15px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          backgroundColor: '#3182ce',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          width: '100%',
                          justifyContent: 'center',
                        }}
                      >
                        <Save size={18} /> Save Node Details
                      </button>
                      {saveSuccess && (
                        <div style={{
                          marginTop: '10px',
                          color: '#38a169',
                          textAlign: 'center',
                        }}>
                          Saved successfully!
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="section" style={{ marginBottom: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: '5px',
                      marginBottom: '10px',
                      backgroundColor: '#f7fafc',
                      borderRadius: '4px',
                    }}
                    onClick={() => toggleSection('configuration')}
                  >
                    {expandedSections.configuration ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    <h3 style={{ margin: '0 0 0 5px' }}>Node Configuration</h3>
                  </div>

                  {expandedSections.configuration && renderNodeSpecificControls()}
                </div>
              </>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50%',
                color: '#718096',
                textAlign: 'center',
                padding: '0 20px',
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>⚙️</div>
                <h3>No Node Selected</h3>
                <p>Select a node from the canvas to edit its properties or add a new node above</p>
              </div>
            )}
          </>
        )}
      </div>

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#3182ce',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 100,
          }}
        >
          <ChevronRight size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;