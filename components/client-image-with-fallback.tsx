'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type ClientImageWithFallbackProps = ImageProps & {
   fallbackSrc?: string
}

const ClientImageWithFallback = ({
   src,
   alt = '',
   fallbackSrc = '/images/not-loaded-image.webp',
   ...props
}: ClientImageWithFallbackProps) => {
   const [error, setError] = useState(false)

   return <Image alt={alt} onError={() => setError(true)} src={error ? fallbackSrc : src} {...props} />
}

export default ClientImageWithFallback
