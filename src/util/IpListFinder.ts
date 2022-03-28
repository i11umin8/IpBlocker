export class IpListFinder {
    static async findIpLists(ipData) {
        const ipSets = []
        await ipData.forEach((document) => {
            if (!ipSets.includes(document.ipSet)) {
                ipSets.push(document.ipSet)
            }
        })

        return ipSets
    }
}