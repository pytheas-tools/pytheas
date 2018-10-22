export let pubsub = (() => {
  const topics: any = {};
  const hOP = topics.hasOwnProperty;

  return {
    subscribe: (topic: string, listener: (data: any) => void) => {
      // Create the topic's object if not yet created
      if (!hOP.call(topics, topic)) topics[topic] = [];

      // Add the listener to queue
      const index = topics[topic].push(listener) - 1;

      // Provide handle back for removal of topic
      return {
        remove: () => {
          delete topics[topic][index];
        }
      };
    },
    publish: (topic: string, info?: any) => {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if (!hOP.call(topics, topic)) {
        return;
      }

      // Cycle through topics queue, fire!
      topics[topic].forEach((item: any) => {
      		item(info !== undefined ? info : {});
      });
    }
  };
})();
