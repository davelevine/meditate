export const showAppVersion = () => {
  console.log(
    `
%cVER: ${process.env.REACT_APP_VERSION}
NAME: ${process.env.REACT_APP_NAME}
`,
    "background: #222; color: #bada55"
  )
}
