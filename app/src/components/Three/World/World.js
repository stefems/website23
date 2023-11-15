import Experience from '../Experience.js'
import Environment from './Environment.js'
import Text from './Text.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        // this.resources = this.experience.resources

        // // Wait for resources
        // this.resources.on('ready', () =>
        // {
        // Setup
        this.text = new Text()
        this.environment = new Environment()
        // })
    }

    update()
    {
      if (this.text) {
        this.text.update()
      }
    }
}