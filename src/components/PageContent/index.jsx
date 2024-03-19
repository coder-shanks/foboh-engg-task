import PropTypes from 'prop-types'
function PageContent({ children }) {
  return (
    <div
      className={`lg:ml-[var(--sidebar-width)] p-6 lg:h-[calc(100%-var(--header-height))]`}
    >
      {children}
    </div>
  )
}

PageContent.propTypes = {
  children: PropTypes.node
}

export default PageContent
