// blankFlowNodeOptions.js
const blankFlowNodeOptions = {
    start: [
      'authenticatedNode',
      'notAuthenticatedNode',
      'voiceagent',
      'mailagent',
      'chatagent',
      'greetingMessage',
      'prompt',
    ],
    authenticatedNode: [ 'greetingMessage', 'prompt'],
    notAuthenticatedNode: ['prompt', 'greetingMessage'],
    departmentClassifier: ['rag', 'llm', 'ticketcreation'],
    rag :['response'],
    response: ['ticketcreated', 'gladMessage', 'prompt','llm','rag'],
    llm: ['rag', 'ticketcreation', 'response','gladMessage'],
    greetingMessage: ['departmentClassifier', 'prompt', 'rag'],
    voiceagent: ['prompt', 'greetingMessage'],
    mailagent: ['prompt', 'greetingMessage'],
    chatagent: ['prompt', 'greetingMessage'],
    prompt: ['ticketcreation', 'llm', 'rag', 'departmentClassifier'],
    ticketcreation: ['ticketcreated', 'gladMessage'],
    ticketcreated: ['gladMessage', 'response'],
    gladMessage: ['prompt', 'ticketcreation'],
  };
  
  export default blankFlowNodeOptions;