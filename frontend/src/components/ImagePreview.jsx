import { X, ScanEye } from 'lucide-react'

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function ImagePreview({ file, previewUrl, onRemove, onAnalyze, analyzing }) {
  return (
    <div className="w-full rounded-3xl bg-white shadow-card p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="relative w-full sm:w-48 aspect-square rounded-2xl overflow-hidden bg-paddy-50 shrink-0">
          <img src={previewUrl} alt="Uploaded rice leaf preview" className="w-full h-full object-cover" />
          <button
            onClick={onRemove}
            aria-label="Remove image"
            className="absolute top-2 right-2 w-8 h-8 grid place-items-center rounded-full bg-white/90 text-paddy-900 shadow-soft hover:bg-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm text-paddy-900/50 mb-1">Ready to analyze</p>
            <p className="font-medium text-paddy-950 break-all">{file?.name}</p>
            <p className="text-sm text-paddy-900/60 mt-1">{formatFileSize(file?.size ?? 0)}</p>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onAnalyze}
              disabled={analyzing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-paddy-600 text-white font-semibold hover:bg-paddy-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              <ScanEye size={18} />
              {analyzing ? 'Analyzing...' : 'Analyze Leaf'}
            </button>
            <button
              onClick={onRemove}
              disabled={analyzing}
              className="px-6 py-3 rounded-full border border-paddy-200 text-paddy-800 font-semibold hover:bg-paddy-50 disabled:opacity-60 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
