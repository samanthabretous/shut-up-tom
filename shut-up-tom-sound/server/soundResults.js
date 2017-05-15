class SoundResults {
  constructor() {
    this.results = [10,20,30,40];
    this.amountOfResultsToTrack = 10;
  }
  getLastResult() {
    return this.results[this.results.length - 1];
  }
  addResult(amps) {
    // when the results array gets to "10" then remove old data
    if (this.results.length >= this.amountOfResultsToTrack) {
      this.results.unshift();
    }
    this.results.push(amps)
  }
}

module.exports = SoundResults;
