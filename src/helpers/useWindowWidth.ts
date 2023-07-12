import React from "react"

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = React.useState<number | null>(null)

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowWidth
}
