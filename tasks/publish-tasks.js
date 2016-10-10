import gulp from 'gulp'
import hash from 'object-hash'
import CompileTasks from './compile-tasks.js'

const NAMESPACE = 'publish'

export default class PublishTasks {
  constructor(params) {
    const { compileParams } = params

    this.name = `${NAMESPACE}-${hash(params).substring(0, 3)}`
    this.params = params
    this.pushSite = `${this.name}:push-site`
    this.default = this.pushSite

    const compileTasks = new CompileTasks({
      ...compileParams,
      publish: true,
    })

    gulp.task(this.pushSite, [compileTasks.default], () => {
      // currently a noop
    })
  }
}
