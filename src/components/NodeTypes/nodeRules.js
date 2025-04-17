// NodeTypes.js
export const nodeConnections = {
  start: ['greetingMessage', 'prompt'],
  authenticatedNode: ['prompt'],
  notAuthenticatedNode: ['prompt'],
  departmentClassifier: ['rag','llm'],
  // rag: [ 'llm'],
  response: ['ticketcreated'],
  llm: ['rag', 'ticketcreation'],
  greetingMessage: ['departmentClassifier', 'prompt'],
  // voiceagent: ['prompt'],
  // mailagent: ['prompt'],
  // chatagent: ['prompt'],
  prompt: ['ticketcreation', 'llm', 'rag'],
  ticketcreation: ['ticketcreated'],
  ticketcreated: ['gladMessage'],
  gladMessage: [],
};
  export const nodeTypeNames = {
    start: 'Start Node',
    authenticatedNode: 'Authenticated',
    notAuthenticatedNode: 'Not Authenticated',
    departmentClassifier: 'Department Classifier',
    rag: 'RAG',
    response: 'Response',
    llm: 'LLM',
    ticketcreation: 'Ticket Creation',
    greetingMessage: 'Greeting Message',
    voiceagent: 'Voice Agent',
    mailagent: 'Mail Agent',
    chatagent: 'Chat Agent',
    prompt: 'Prompt',
    gladMessage: 'Glad Message',
    ticketcreated: 'Ticket Created'
  };


