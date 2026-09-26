import { useCallback, useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export default function UploadBox({ onFileSelected, onError }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const validateAndEmit = useCallback(
    (file) => {
      if (!file) return
      if (!ACCEPTED_TYPES.includes(file.type)) {
        onError?.('Unsupported format. Please upload a JPG or PNG image.')
        return
      }
      if (file.size > 8 * 1024 * 1024) {
        onError?.('Image is too large. Please upload an image under 8 MB.')
        return
      }
      onFileSelected(file)
    },
    [onFileSelected, onError]
  )

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    validateAndEmit(file)
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`w-full rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center transition-colors cursor-pointer ${
        isDragging ? 'border-paddy-500 bg-paddy-50' : 'border-paddy-200 bg-white hover:border-paddy-300'
      }`}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={(e) => validateAndEmit(e.target.files?.[0])}
      />
      <div className="mx-auto w-16 h-16 rounded-2xl bg-paddy-100 grid place-items-center mb-5">
        <UploadCloud size={28} className="text-paddy-600" />
      </div>
      <h3 className="text-xl font-semibold text-paddy-950">Upload Rice Leaf Image</h3>
      <p className="mt-2 text-paddy-900/60">Drag & drop your image here</p>
      <p className="my-3 text-sm text-paddy-900/40">OR</p>
      <span className="inline-block px-5 py-2.5 rounded-full bg-paddy-600 text-white text-sm font-semibold">
        Browse Image
      </span>
      <p className="mt-5 text-xs text-paddy-900/50">Supported formats: JPG, JPEG, PNG · up to 8 MB</p>
    </div>
  )
}
