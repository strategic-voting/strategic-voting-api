'use strict';

const polling_data = require('./per_riding_projections.json');
const short_to_long_party_name = {
  green: 'Green Party of Ontario',
  ndp: 'New Democratic Party of Ontario',
  lib: 'Ontario Liberal Party',
  pc: 'Progressive Conservative Party of Ontario',
}

module.exports = class NotFordSelector {
  who_to_vote_for(riding) {
    let polling_for_riding = polling_data[riding];
    let polling_without_pc = this.remove_pcs(polling_for_riding);
    let inverse_data = this.polling_as_key(polling_without_pc);
    let sorted = this.sorted_polls(polling_without_pc);
    let vote_party = inverse_data[sorted[0]];
    return short_to_long_party_name[vote_party];
  }

  remove_pcs(riding_poll) {
    let riding_without_pcs = {};
    Object.keys(riding_poll).forEach((party) => {
      if (party != 'pc') {
        riding_without_pcs[party] = riding_poll[party];
      }
    });
    return riding_without_pcs;
  }

  polling_as_key(riding_poll) {
    let inverse_map = {}
    Object.keys(riding_poll).forEach((party) => {
      inverse_map[riding_poll[party]] = party;
    })
    return inverse_map;
  }

  sorted_polls(riding_poll) {
    let polls = []
    Object.keys(riding_poll).forEach((party) => {
      polls.push(parseInt(riding_poll[party]));
    })
    return polls.sort((a, b) => b - a);
  }
}