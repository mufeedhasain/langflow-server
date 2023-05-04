import { useContext, useEffect } from 'react';
import { typesContext } from '../../contexts/typesContext';
import useSocketIO from './useSocketIO';  // assuming socket connecction written by gaurav sir

const distributionFunction = () => {
  const { types, setTypes } = useContext(typesContext);
  const { receiveData, sendData } = useSocketIO('localhost:3000');

  useEffect(() => {
    // Listen for messages from the socket
    receiveData((data) => {
      // Check if the data is for a node that already exists in types
      const nodeToUpdate = types.find((node) => node.id === data.id);
      if (nodeToUpdate) {
        // If the node exists, update its data and send it back to the socket
        const updatedNode = { ...nodeToUpdate, data: data.data };
        setTypes((prevTypes) =>
          prevTypes.map((node) => (node.id === updatedNode.id ? updatedNode : node))
        );
        sendData(updatedNode);
      }
    });  
  }, [receiveData, sendData, setTypes, types]);

  return null;
};

export default distributionFunction;