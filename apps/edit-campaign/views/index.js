import { view } from 'view'
import editCampaignLayout from 'components/edit-campaign/layout'
import details from './details'
import targeting from './targeting'
import review from './review'

export default view((_, { tree }) => {
  return editCampaignLayout({
    step: tree.get('step'),
    child: [details, null, targeting, review][tree.get('step')],
    enableNextStep: tree.get('enableNextStep'),
    campaign: tree.select('campaign')
  })
})
