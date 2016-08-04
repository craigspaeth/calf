import veact from 'veact'
import EditCampaignLayout from 'components/edit-campaign/layout'
import adbuilder from './adbuilder'
import { state } from '../controller'

const view = veact()
const { layout } = view.els({ layout: EditCampaignLayout })

view.render(() => {
  return layout({
    step: 1,
    child: adbuilder,
    enableNextStep: state.get('enableNextStep'),
    campaign: state.select('campaign')
  })
})

export default view()
