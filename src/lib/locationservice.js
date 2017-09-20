export default class LocationService {
    constructor(fetchImpl) {
        this.fetch = fetchImpl;
    }

    async allLocations() {
        const response = await this.fetch('/api/location?sort_field=id&is_attached_to_container=T');
        const pageRequests = Array(response.meta.pages).fill(1).map((i, j) => j + 1)
        pageRequests.shift();
        const rest = await Promise.all((pageRequests || []).map(page => this.fetch(`/api/location?sort_field=id&is_attached_to_container=T&page=${page}`)));
        const flattened = rest.map(entry => entry.locations).reduce((acc, current) => acc.concat(current), []);
        return (response.locations || []).concat(flattened);
    }
}
