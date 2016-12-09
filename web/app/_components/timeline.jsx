import preact from 'preact'
import styles from '@cssmodules/_components/timeline.css.json'

export default class Timeline extends preact.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      groupedItems: groupItems(props.items, props.timestampFunction),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupedItems: groupItems(nextProps.items, nextProps.timestampFunction),
    })
  }

  render() {
    const { state, props } = this
    const { groupedItems } = state

    return (
      <ul className={styles['year-list']}>
        {groupedItems.map((yearItem) => {
          return renderYearSection(yearItem, props)
        })}
      </ul>
    )
  }
}

function renderYearSection(yearItem, props) {
  return (
    <li className={styles['year-list-item']}>
      <p className={styles['year-list-item-heading']}>{yearItem.year}</p>

      <ul className={styles['month-list']}>
        {yearItem.data.map((monthItem) => {
          return renderMonthSection(monthItem, props)
        })}
      </ul>
    </li>
  )
}

function renderMonthSection(monthItem, props) {
  return (
    <li className={styles['month-list-item']}>
      <p className={styles['month-list-item-heading']}>
        {monthItem.formattedMonth}
      </p>

      <ul className={styles['day-list']}>
        {monthItem.data.map((dayItem) => {
          return renderDaySection(dayItem, props)
        })}
      </ul>
    </li>
  )
}

function renderDaySection(dayItem, props) {
  const { renderItem } = props

  return (
    <li className={styles['day-list-item']}>
      <p className={styles['day-list-item-heading']}>
        {dayItem.day}
      </p>

      <ul className={styles['blog-list']}>
        {dayItem.data.map((item) => {
          return (
            <li className={styles['blog-list-item']}>
              {renderItem(item)}
            </li>
          )
        })}
      </ul>
    </li>
  )
}

function groupItems(items, timestampFunction) {
  const groupedByYear = {}

  items.forEach((item) => {
    const publishedDate = timestampFunction(item)
    const year = publishedDate.getFullYear()
    const month = publishedDate.getMonth()
    const day = publishedDate.getDate()

    const yearItem = groupedByYear[year] || {}
    const monthItem = yearItem[month] || {}
    const itemsOnTheDay = monthItem[day] || []

    itemsOnTheDay.push(item)

    monthItem[day] = itemsOnTheDay
    yearItem[month] = monthItem
    groupedByYear[year] = yearItem
  })

  const yearGroup = []
  for (const year in groupedByYear) {
    const yearItem = groupedByYear[year]
    const monthGroup = []

    for (const month in yearItem) {
      const monthItem = yearItem[month]
      const dayGroup = []

      for (const day in monthItem) {
        const itemsOnTheDay = monthItem[day]

        dayGroup.push({
          day: parseInt(day, 10),
          data: itemsOnTheDay,
        })
      }

      dayGroup.sort(byKey('day'))
      monthGroup.push({
        data: dayGroup,
        month: parseInt(month, 10),
        formattedMonth: formatMonth(month),
      })
    }

    monthGroup.sort(byKey('month'))
    yearGroup.push({
      year: parseInt(year, 10),
      data: monthGroup,
    })
  }
  yearGroup.sort(byKey('year'))

  return yearGroup
}

function byKey(key) {
  return (a, b) => {
    const valueA = a[key]
    const valueB = b[key]

    if (valueA > valueB) {
      return -1
    } else if (valueB > valueA) {
      return 1
    } else {
      return 0
    }
  }
}

function formatMonth(month) {
  const monthLookup = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return monthLookup[month]
}
