import { view } from 'view'
import editCampaignLayout from 'components/edit-campaign/layout'
import adbuilder from './adbuilder'

export default view((_, { tree }) => {
  return editCampaignLayout({
    step: tree.get('step'),
    child: adbuilder,
    enableNextStep: tree.get('enableNextStep'),
    campaign: tree.select('campaign')
  })
})
