import { useEffect, useState } from "react"

const AlertBox = ({ message, type, onClose }) => {
    if (!message) return null

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const duration = 5000
        const intervalTime = 50
        const step = 100 / (duration / intervalTime)

        let interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + step
                return newProgress >= 100 ? 100 : newProgress
            })
        }, intervalTime)

        const timeout = setTimeout(() => {
            onClose()
        }, duration)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [message])

    return (
        <div
            className={`w-full relative p-4 rounded-lg shadow-md my-4 ${
                type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
        >
            <p className="text-left w-full">{message}</p>
            <button className="font-bold absolute right-1 top-1 cursor-pointer" onClick={onClose}>
                ✖
            </button>
            <div className="w-full h-1 bg-white/30 mt-2">
                <div
                    className="h-full bg-white transition-all"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    )
}

export default AlertBox