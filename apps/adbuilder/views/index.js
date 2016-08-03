import rcomp from 'rcomp'
import EditCampaignLayout from 'components/edit-campaign/layout'
import adbuilder from './adbuilder'
import { state } from '../controller'

const comp = rcomp()
const { layout } = comp.els({ layout: EditCampaignLayout })

comp.render(() => {
  return layout({
    step: 1,
    child: adbuilder,
    enableNextStep: state.get('enableNextStep'),
    campaign: state.select('campaign')
  })
})

export default comp()
