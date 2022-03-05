/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Account from './Account'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Account', () => {
  let account

  beforeEach(() => {
    account = shallow(<Account username="cody" />)
  })

  it('renders the email in an h3', () => {
    expect(account.find('h3').text()).to.be.equal('Welcome, cody')
  })
})
