import { view } from 'view'
import editCampaignLayout from 'components/edit-campaign/layout'
import details from './details'
import targeting from './targeting'
import review from './review'
import { state } from '../controller'

export default view(() => {
  return editCampaignLayout({
    step: state.get('step'),
    child: [details, null, targeting, review][state.get('step')],
    enableNextStep: state.get('enableNextStep'),
    campaign: state.select('campaign')
  })
})
