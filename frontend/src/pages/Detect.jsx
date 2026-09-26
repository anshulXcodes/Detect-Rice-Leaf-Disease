import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import UploadBox from '../components/UploadBox.jsx'
import ImagePreview from '../components/ImagePreview.jsx'
import LoadingState from '../components/LoadingState.jsx'
import PredictionResult from '../components/PredictionResult.jsx'
import { predictDisease } from '../services/api.js'

export default function Detect() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [status, setStatus] = useState('idle') // idle | preview | loading | result
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleFileSelected = (selectedFile) => {
    setError(null)
    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
    setStatus('preview')
  }

  const handleRemove = () => {
    setFile(null)
    setPreviewUrl(null)
    setResult(null)
    setError(null)
    setStatus('idle')
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a rice leaf image before analyzing.')
      return
    }
    setStatus('loading')
    setError(null)
    try {
      const data = await predictDisease(file)
      setResult(data)
      setStatus('result')
    } catch (err) {
      setError(err.message || 'Unable to analyze this image. Please upload a clear photo of a rice leaf.')
      setStatus('preview')
    }
  }

  return (
    <div className="container-page py-12 sm:py-16 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-paddy-950">Detect Rice Leaf Disease</h1>
        <p className="mt-3 text-paddy-900/60">
          Upload a clear photo of a single rice leaf against a plain background for the best results.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 px-5 py-4">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {status === 'idle' && <UploadBox onFileSelected={handleFileSelected} onError={setError} />}

      {status === 'preview' && (
        <ImagePreview
          file={file}
          previewUrl={previewUrl}
          onRemove={handleRemove}
          onAnalyze={handleAnalyze}
          analyzing={false}
        />
      )}

      {status === 'loading' && <LoadingState />}

      {status === 'result' && (
        <PredictionResult result={result} previewUrl={previewUrl} onReset={handleRemove} />
      )}
    </div>
  )
}
