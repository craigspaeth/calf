import { headerHeight, mediumMargin } from 'style'
import { view, dom } from 'view'
import newheader from './header'
import mainheader from '../../layout/header'
import step1 from './step1'
import step2 from './step2'
import step3 from './step3'
import step4 from './step4'

let { div } = dom
let steps = [step1, step2, step3, step4]
let style = {
  step: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: `${headerHeight * 2 + mediumMargin}px`,
    left: '0'
  }
}

export default view((props, { tree }) => (
  div({},
    mainheader({}),
    newheader({}),
    div({ style: style.step }, steps[tree.get('newCampaignStep') || 0]({})))
))
