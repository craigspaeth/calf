import { view } from 'view'
import editCampaignLayout from 'components/edit-campaign/layout'
import adbuilder from './adbuilder'
import { state } from '../controller'

export default view(() => {
  return editCampaignLayout({
    step: 1,
    child: adbuilder,
    enableNextStep: state.get('enableNextStep'),
    campaign: state.select('campaign')
  })
})
