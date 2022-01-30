export function setAttributes(node, attributes) {
    const applyAttributes = () => {
        Object.entries(attributes).forEach(([k, v]) => {
            if (v !== undefined) {
                node.setAttribute(k, v);
            } else {
                node.removeAttribute(k);
            }
        });
    };

    applyAttributes();
    
    return {
        update(updatedAttributes) {
            attributes = updatedAttributes;
            applyAttributes();
        }
    };
  }

export function setProperties(node, properties) {
      const applyProperties = () => {
          Object.entries(properties).forEach(([k, v]) => {
              node[k] = v;
          });
      };

      applyProperties();

      return {
          update(updatedProperties) {
              properties = updatedProperties;
              applyProperties();
          }
      };
}