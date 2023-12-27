const shortestPath = (edges, source, destination) => {

    // Create an adjacency list from the list of edges
    const graph = {};
    for (var i = 0; i < edges.length; i++) {
        // const [v1, v2, t1] = edges[i];
        // console.log(edges[i]);
        // console.log(v1, v2, t1);
        const v1 = edges[i]["v1"], v2 = edges[i]["v2"], t1 = edges[i]["t1"];
        if (!graph[v1]) graph[v1] = [];
        if (!graph[v2]) graph[v2] = [];
        graph[v1].push({ node: v2, time : t1 });
        graph[v2].push({ node: v1, time : t1});
    }

    // Initialize distances and visited nodes
    const distances = {};
    const visited = {};
    for (const node in graph) {
        distances[node] = Infinity;
        visited[node] = false;
    }
    distances[source] = 0;

    // Dijkstra's algorithm
    const queue = [source];
    while (queue.length > 0) {
        // Find the node with the shortest distance in the queue
        let minDistNode = queue[0];
        for (const node of queue) {
            if (distances[node] < distances[minDistNode]) {
                minDistNode = node;
            }
        }

        // Mark the node as visited
        visited[minDistNode] = true;
        queue.splice(queue.indexOf(minDistNode), 1);

        // Update distances to neighbors
        for (const neighbor of graph[minDistNode]) {
            const potentialDist = distances[minDistNode] + neighbor.time;
            if (potentialDist < distances[neighbor.node]) {
                distances[neighbor.node] = potentialDist;
                if (!visited[neighbor.node]) {
                    queue.push(neighbor.node);
                }
            }
        }
    }

    // Reconstruct the shortest path
    const path = [destination];
    let currentNode = destination;
    while (currentNode !== source) {
        for (const neighbor of graph[currentNode]) {
            if (distances[currentNode] - neighbor.time === distances[neighbor.node]) {
                path.unshift(neighbor.node);
                currentNode = neighbor.node;
                break;
            }
        }
    }
    const time = distances[destination];

    return { path, time };
};

module.exports = { shortestPath: shortestPath };