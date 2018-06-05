'use strict';

const request = require('request');
const OPEN_NORTH_URL = 'https://represent.opennorth.ca';
const MAJOR_PARTIES = [
  'Green Party of Ontario',
  'New Democratic Party of Ontario',
  'Ontario Liberal Party',
  'Progressive Conservative Party of Ontario',
]

module.exports = class OpenNorthGateway {
  candidates_in_postalcode(postalcode, callback) {
    request(`${OPEN_NORTH_URL}/postcodes/${postalcode}`, { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      let major_candidates = this.get_major_candidates(body['candidates_centroid']);
      let slim_candidates = this.filter_only_needed_info(major_candidates);
      callback(slim_candidates);
    })
  }

  get_major_candidates(candidates) {
    return candidates.filter((candidate) => {
      return MAJOR_PARTIES.includes(candidate['party_name']);
    });
  }

  filter_only_needed_info(candidates) {
    return candidates.map((candidate) => {
      return {
        name: candidate['name'],
        party: candidate['party_name'],
        riding: candidate['district_name']
      };
    })
  }
}