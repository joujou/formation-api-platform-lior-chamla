import React from 'react'
import ContentLoader from 'react-content-loader'

const FormContentLoader = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={150}
    viewBox="0 0 500 150"
    backgroundColor="#596b97"
    foregroundColor="#1d1c5a"
    {...props}
  >
    <rect x="6" y="-70" rx="0" ry="0" width="344" height="45" />
    <rect x="6" y="3" rx="0" ry="0" width="105" height="13" />
    <rect x="6" y="27" rx="0" ry="0" width="402" height="19" />
    <rect x="223" y="37" rx="0" ry="0" width="1" height="0" />
    <rect x="6" y="57" rx="0" ry="0" width="105" height="13" />
    <rect x="6" y="80" rx="0" ry="0" width="402" height="19" />
    <rect x="223" y="90" rx="0" ry="0" width="1" height="0" />
    <rect x="6" y="115" rx="0" ry="0" width="105" height="13" />
    <rect x="6" y="137" rx="0" ry="0" width="402" height="19" />
    <rect x="223" y="148" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
)

export default FormContentLoader
