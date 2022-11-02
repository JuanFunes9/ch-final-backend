const getServerInfo = (req, res) => {
    const processInfo = {
        SO: process.platform,
        NodeVersion: process.version,
        title: process.title,
        execPath: process.execPath,
        processId: process.pid,
        MemoryUsage: process.memoryUsage().rss / 1048576 + " Mb"
    };

    return res.json({
        ok: true,
        data: null,
        processInfo
    });
}

module.exports = {
    getServerInfo
};