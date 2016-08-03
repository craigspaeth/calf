import rcomp from 'rcomp'
import EditCampaignLayout from 'components/edit-campaign/layout'
import Details from './details'
import Targeting from './targeting'
import Review from './review'
import { state } from '../controller'

const comp = rcomp()
const { layout, details, targeting, review } = comp.els({
  layout: EditCampaignLayout,
  details: Details,
  targeting: Targeting,
  review: Review
})

comp.render(() => {
  return layout({
    step: state.get('step'),
    child: [details, null, targeting, review][state.get('step')],
    enableNextStep: state.get('enableNextStep'),
    campaign: state.select('campaign')
  })
})

export default comp()
