const request = require('superagent');

class SoundResults {
  constructor() {
    this.results = [10,20,30,40];
    this.amountOfResultsToTrack = 15;
  }
  getLastResult() {
    return this.results[this.results.length - 1];
  }
  getNewData() {
    const secondToLastResult = this.results[this.results.length - 2];
    console.log(secondToLastResult);
    console.log(this.getLastResult());
    if(this.getLastResult() >= secondToLastResult + 10 ||
      this.getLastResult() <= secondToLastResult - 10) {
      return { updatedAmps: this.getLastResult() }
    }
    return {}
  }
  addResult(amps) {
    // when the results array gets to "10" then remove old data
    if (this.results.length >= this.amountOfResultsToTrack) {
      this.results.unshift();
    }
    this.results.push(amps)
    // if (amps > 10) {
    //   request
    //   .post('https://hooks.slack.com/services/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')
    //   .send({"text": "This is a line of text in a channel.\nAnd this is another line of text."})
    //   .end((err, res) => {
    //     if (err || !res.ok) {
    //       console.log('Oh no! error');
    //     }
    //   })
    // }
  }
}

module.exports = SoundResults;
