let cache = {}
const hours = 12
const minutes = 60
const seconds = 60
const milliSeconds = 1000

class Cache {
    constructor(noOfHoursToCache) {
        this.cacheTime = (!noOfHoursToCache ? 12 : noOfHoursToCache) * minutes * seconds * milliSeconds
        try {
            cache = JSON.parse(localStorage.getItem('weather_app_cache') || '{}')
        }
        catch {
            cache = {}
        }
    }
    setCache(key, value) {
        const element = {
            timeStamp: new Date().valueOf(),
            cacheTime: this.cacheTime,
            value
        }
        cache[key.toLowerCase()] = element
        localStorage.setItem('weather_app_cache', JSON.stringify(cache))
    }
    getCache(key) {
        const element = cache[key.toLowerCase()]
        if (element && (element.timeStamp + this.cacheTime < new Date().valueOf())) {
            cache[key.toLowerCase()] = undefined
            return undefined
        }
        return element?.value
    }
}

export default Cache