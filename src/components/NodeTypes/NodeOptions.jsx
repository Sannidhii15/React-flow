import React, { useState, useEffect, useRef } from 'react';
import { nodeTypeNames } from './nodeRules';
import blankFlowNodeOptions from './blankFlowNodeOptions';

const NodeOptions = ({ id, onOptions, nodeType, allowedConnections = [], flowType }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      const isButton = e.target.tagName === 'BUTTON';
      const isOptionMenu = e.target.closest('[data-options-menu]');
      if (!isButton && !isOptionMenu) {
        setShowOptions(false);
        setShowSubMenu(false);
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleOptionClick = (action, e) => {
    e.stopPropagation();
    if (typeof onOptions !== 'function') {
      console.error('onOptions is not a function', { id, action });
      return;
    }

    if (action === 'add') {
      setShowSubMenu(true);
    } else {
      onOptions(id, action, e);
      setShowOptions(false);
      setShowSubMenu(false);
    }
  };

  const handleSubMenuClick = (newNodeType) => {
    if (typeof onOptions === 'function') {
      onOptions(id, 'add', null, { newNodeType });
    }
    setShowSubMenu(false);
    setShowOptions(false);
  };

  const nodesToShow = flowType === 'blank'
    ? (blankFlowNodeOptions[nodeType] || [])
    : (allowedConnections.length > 0 ? allowedConnections : []);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(!showOptions);
        }}
        style={{
          position: 'absolute',   
          right: '-1px',
          top: '-5px',
          background: 'none',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          padding: '5px',
        }}
      >
        ⋮
      </button>
      {showOptions && (
        <div
          ref={optionsRef}
          data-options-menu
          style={{
            position: 'absolute',
            top: '-90px', // Changed from -160px to 20px to appear just below the button
            left: '60px', // Adjusted from -15px to align better with the button
            background: 'white',
            border: '1px solid gray',
            borderRadius: '5px',
            padding: '10px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
            width: '150px',
            zIndex: 1000,
          }}
        >
          <button
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '5px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              fontSize: '14px',
              color: '#333',
              position: 'relative',
            }}
            onClick={(e) => handleOptionClick('add', e)}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Add New Node
            <span style={{ position: 'absolute', right: '5px', fontSize: '22px', top: '1px' }}>›</span>
          </button>
          {showSubMenu && (
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '100%',
                marginLeft: '5px',
                background: 'white',
                border: '1px solid gray',
                borderRadius: '5px',
                padding: '10px',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
                width: '160px',
                zIndex: 1001,
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  paddingBottom: '5px',
                  borderBottom: '1px solid #eee',
                  marginBottom: '5px',
                }}
              >
                Add New Node
              </div>
              {nodesToShow.length > 0 ? (
                nodesToShow.map((nodeTypeOption) => {
                  const friendlyName = nodeTypeNames[nodeTypeOption] || nodeTypeOption;
                  return (
                    <button
                      key={nodeTypeOption}
                      onClick={() => handleSubMenuClick(nodeTypeOption)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '5px 8px',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        fontSize: '14px',
                        color: '#333',
                        borderRadius: '3px',
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
                    >
                      {friendlyName}
                    </button>
                  );
                })
              ) : (
                <div style={{ fontSize: '14px', color: '#666', padding: '5px' }}>
                  No nodes available
                </div>
              )}
              <button
                onClick={() => setShowSubMenu(false)}
                style={{
                  marginTop: '8px',
                  padding: '5px 15px',
                  background: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: '14px',
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <button
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '5px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
            }}
            onClick={(e) => handleOptionClick('delete', e)}
          >
            Delete Node
          </button>
        </div>
      )}
    </>
  );
};

export default NodeOptions;