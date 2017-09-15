export default class ContainerService {
    constructor(fetchImpl) {
        this.fetch = fetchImpl;
    }

    /**
     * Get a list of containers.
     *
     * @param string getParams
     * @todo Create proper API for this and not just random getParam string
     * @return object
     */
    async containers(getParams) {
        const response = await this.fetch('/api/container' + getParams);
        return response;
    }

    async containerByID(containerID) {
        const response = await this.fetch(`/api/container/${containerID}`);
        return response;
    }

    async containerItemsByID(containerID, getParams) {
        const response = await this.fetch(`/api/container/${containerID}/item${getParams}`);
        return response;
    }
}
