import React, { useState } from "react";
import PropTypes from "prop-types";

export const LocalizeContext = React.createContext({
  resource: {},
  updateResource: () => {},
  getKeyValue: () => {}
});

export default function LocalizeProvider ({ children }) {
  const [resource, setResource] = useState(undefined);

  const updateResource = (resource) => {
    setResource(resource);
  };

  const getKeyValue = (key) => {
    const value = resource ? resource[`${key}`] : key;
    return value || key;
  };

  const contextValue = {
    resource,
    updateResource: React.useCallback((resource) => updateResource(resource), []),
    getKeyValue: React.useCallback((key) => getKeyValue(key), [getKeyValue])
  };

  return (
    <LocalizeContext.Provider value={contextValue}>{children}</LocalizeContext.Provider>
  );
}

LocalizeProvider.propTypes = {
  children: PropTypes.node
};
