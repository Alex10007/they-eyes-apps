"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Upload,
  Users,
  Send,
  Wifi,
  ImageIcon,
  Video,
  X,
  Settings,
  Search,
  Download,
  Share2,
  Eye,
  Trash2,
  Clock,
  Globe,
  UserPlus,
  Bell,
  MoreVertical,
  Play,
  Heart,
  MessageCircle,
  Folder,
  Grid,
  List,
  RefreshCw,
  Shield,
  Zap,
  FileText,
  Archive,
  FileIcon,
  MessageSquare,
  Phone,
  VideoIcon as VideoCallIcon,
  Mic,
  MicOff,
  PhoneOff,
  User,
  ArrowRight,
  CircleDotDashed,
  Inbox,
  Rss,
  Camera,
  VideoIcon as VideoCamera,
  WebcamIcon as LiveIcon,
  ViewIcon as ViewersIcon,
  SendIcon as PostSendIcon,
} from "lucide-react"

const ProfessionalSocialThrow = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "Alex Thompson",
    avatar: "👤",
    status: "online",
    devices: 2,
  })

  const [viewMode, setViewMode] = useState("radar") // radar, list, grid
  const [activeTab, setActiveTab] = useState("feed") // New default: feed, share, received, gallery, settings
  const [selectedFiles, setSelectedFiles] = useState([])
  const [shareMode, setShareMode] = useState("throw") // throw, direct, broadcast
  const [privacyMode, setPrivacyMode] = useState("friends") // public, friends, private

  const [nearbyDevices, setNearbyDevices] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      device: "iPhone 15 Pro",
      distance: 1.2,
      angle: 45,
      online: true,
      status: "active",
      avatar: "👩‍💼",
      lastSeen: "now",
      paired: true,
      signalStrength: 85,
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      device: "Samsung Galaxy S24",
      distance: 2.8,
      angle: 120,
      online: true,
      status: "away",
      avatar: "👨‍💻",
      lastSeen: "2m ago",
      paired: true,
      signalStrength: 92,
    },
    {
      id: 3,
      name: "Emma Wilson",
      device: "iPad Pro",
      distance: 0.8,
      angle: 270,
      online: false,
      status: "offline",
      avatar: "👩‍🎨",
      lastSeen: "15m ago",
      paired: false,
      signalStrength: 0,
    },
    {
      id: 4,
      name: "David Kim",
      device: "MacBook Pro",
      distance: 3.5,
      angle: 315,
      online: true,
      status: "busy",
      avatar: "👨‍🔬",
      lastSeen: "now",
      paired: true,
      signalStrength: 78,
    },
  ])

  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [throwTarget, setThrowTarget] = useState(null)
  const [notifications, setNotifications] = useState([])

  const [sentItems, setSentItems] = useState([
    {
      id: 1,
      to: "Sarah Chen",
      type: "image",
      name: "vacation_sunset.jpg",
      size: 2.4,
      time: "2 min ago",
      status: "delivered",
      thumbnail: "🌅",
      views: 1,
      likes: 0,
    },
    {
      id: 2,
      to: "Mike Rodriguez",
      type: "video",
      name: "presentation_demo.mp4",
      size: 15.2,
      time: "5 min ago",
      status: "sent",
      thumbnail: "🎥",
      views: 0,
      likes: 0,
    },
  ])

  const [receivedItems, setReceivedItems] = useState([
    {
      id: 1,
      from: "Sarah Chen",
      fromAvatar: "👩‍💼",
      type: "image",
      name: "team_meeting.jpg",
      size: 3.1,
      time: "1 min ago",
      thumbnail: "📷",
      viewed: false,
      liked: false,
      comments: 0,
      category: "work",
    },
    {
      id: 2,
      from: "Mike Rodriguez",
      fromAvatar: "👨‍💻",
      type: "video",
      name: "funny_cat_compilation.mp4",
      size: 8.7,
      time: "3 min ago",
      thumbnail: "🐱",
      viewed: true,
      liked: true,
      comments: 2,
      category: "entertainment",
    },
  ])

  const [galleryItems, setGalleryItems] = useState([
    { id: 1, name: "project_photos.zip", type: "archive", size: 45.2, date: "2024-06-10", shared: 5 },
    { id: 2, name: "birthday_video.mp4", type: "video", size: 120.5, date: "2024-06-09", shared: 12 },
    { id: 3, name: "conference_slides.pdf", type: "document", size: 8.9, date: "2024-06-08", shared: 3 },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("all") // all, images, videos, documents
  const [sortBy, setSortBy] = useState("recent") // recent, name, size, popularity

  // --- New states for Chat, Calls, Posts & Live Stream ---
  const [activeChat, setActiveChat] = useState(null) // { deviceId, name, avatar }
  const [chatMessages, setChatMessages] = useState({}) // { deviceId: [{ sender, message, time }] }
  const [callState, setCallState] = useState(null) // { type: 'voice' | 'video', status: 'ringing' | 'connecting' | 'active' | 'ended', participant: { id, name, avatar } }
  const [isMicMuted, setIsMicMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Chen",
      authorAvatar: "👩‍💼",
      type: "status",
      content: "Excited to announce our new project launch next week! Stay tuned for updates. #innovation #tech",
      time: "1 hour ago",
      likes: 15,
      comments: 3,
      hasLiked: false,
    },
    {
      id: 2,
      author: "Mike Rodriguez",
      authorAvatar: "👨‍💻",
      type: "video",
      content: "Quick demo of our latest AI-powered analytics dashboard. Feedback welcome! 📈 #data #AI",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video URL
      time: "3 hours ago",
      likes: 42,
      comments: 8,
      hasLiked: true,
    },
    {
      id: 3,
      author: "Emma Wilson",
      authorAvatar: "👩‍🎨",
      type: "live",
      title: "Live: Q&A on Digital Marketing Strategies",
      streamerId: 3, // Corresponds to Emma Wilson in nearbyDevices
      time: "Live now",
      viewers: 125,
      isLive: true,
    },
  ])
  const [isLiveStreaming, setIsLiveStreaming] = useState(false)
  const [liveStreamTitle, setLiveStreamTitle] = useState("")
  const [liveStreamViewers, setLiveStreamViewers] = useState(0)

  // --- End New States ---

  const fileInputRef = useRef(null)
  const containerRef = useRef(null)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const chatMessagesEndRef = useRef(null) // For auto-scrolling chat
  const postVideoInputRef = useRef(null) // For video posts

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  // Simulate live stream viewer count
  useEffect(() => {
    let interval
    if (isLiveStreaming) {
      interval = setInterval(() => {
        setLiveStreamViewers((prev) => Math.max(1, prev + Math.floor(Math.random() * 5) - 2)) // Fluctuating viewers
      }, 5000)
    } else {
      setLiveStreamViewers(0)
    }
    return () => clearInterval(interval)
  }, [isLiveStreaming])

  // File handling for sharing
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type.startsWith("video/") ? "video" : file.type.startsWith("image/") ? "image" : "document",
      size: file.size,
      file: file,
      selected: false,
      thumbnail: file.type.startsWith("video/") ? "🎥" : file.type.startsWith("image/") ? "🖼️" : "📄",
    }))
    setSelectedFiles((prev) => [...prev, ...newFiles])
  }

  // Drag and drop functionality
  const handleDragStart = (e, fileId) => {
    if (shareMode !== "throw") return

    setIsDragging(true)
    const rect = containerRef.current.getBoundingClientRect()
    dragStartPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      fileId: fileId,
    }
    setDragPosition({ x: 0, y: 0 })
  }

  const handleDragMove = (e) => {
    if (!isDragging) return

    const rect = containerRef.current.getBoundingClientRect()
    const currentX = e.clientX - rect.left
    const currentY = e.clientY - rect.top

    setDragPosition({
      x: currentX - dragStartPos.current.x,
      y: currentY - dragStartPos.current.y,
    })

    const targetDevice = getDeviceAtPosition(currentX, currentY)
    setThrowTarget(targetDevice)
  }

  const handleDragEnd = () => {
    if (!isDragging) return

    setIsDragging(false)

    if (throwTarget && dragStartPos.current.fileId) {
      shareFile(dragStartPos.current.fileId, throwTarget)
    }

    setDragPosition({ x: 0, y: 0 })
    setThrowTarget(null)
  }

  const getDeviceAtPosition = (x, y) => {
    if (viewMode !== "radar") return null

    const centerX = 200 // Center of the radar (relative to its container)
    const centerY = 200

    for (const device of nearbyDevices) {
      if (!device.online) continue

      const maxRadius = 120
      const minRadius = 40
      const radius = maxRadius - (device.distance / 4) * (maxRadius - minRadius)

      const deviceX = centerX + Math.cos((device.angle * Math.PI) / 180) * radius
      const deviceY = centerY + Math.sin((device.angle * Math.PI) / 180) * radius

      const distance = Math.sqrt((x - deviceX) ** 2 + (y - deviceY) ** 2)
      if (distance < 40) {
        return device
      }
    }
    return null
  }

  // Sharing functionality
  const shareFile = (fileId, target) => {
    const file = selectedFiles.find((f) => f.id === fileId)
    if (!file) return

    const newSentItem = {
      id: Date.now(),
      to: target.name,
      type: file.type,
      name: file.name,
      size: file.size / (1024 * 1024),
      time: "Just now",
      status: "sending",
      thumbnail: file.thumbnail,
      views: 0,
      likes: 0,
    }

    setSentItems((prev) => [newSentItem, ...prev])
    addNotification(`Sending ${file.name} to ${target.name}`, "info")

    setTimeout(() => {
      setSentItems((prev) => prev.map((item) => (item.id === newSentItem.id ? { ...item, status: "delivered" } : item)))
      addNotification(`File delivered to ${target.name}`, "success")
      setReceivedItems((prev) => [
        {
          id: Date.now() + 1,
          from: target.name,
          fromAvatar: target.avatar,
          type: file.type,
          name: file.name,
          size: file.size / (1024 * 1024),
          time: "Just now",
          thumbnail: file.thumbnail,
          viewed: false,
          liked: false,
          comments: 0,
          category: "shared",
        },
        ...prev,
      ])
    }, 2000)

    setSelectedFiles((prev) => prev.filter((f) => f.id !== file.id))
  }

  const addNotification = (message, type) => {
    const notification = {
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleTimeString(),
    }
    setNotifications((prev) => [notification, ...prev.slice(0, 4)])
  }

  // Device discovery simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setNearbyDevices((prev) =>
        prev.map((device) => ({
          ...device,
          signalStrength: device.online
            ? Math.max(60, Math.min(100, device.signalStrength + (Math.random() - 0.5) * 10))
            : 0,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Mouse event handlers for global drag
  useEffect(() => {
    const handleMouseMove = (e) => handleDragMove(e)
    const handleMouseUp = () => handleDragEnd()

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  // --- Chat and Call Functions ---
  const startChat = (device) => {
    setActiveChat(device)
    if (!chatMessages[device.id]) {
      setChatMessages((prev) => ({ ...prev, [device.id]: [] }))
    }
    addNotification(`Started chat with ${device.name}`, "info")
  }

  const sendMessage = (message) => {
    if (!activeChat || !message.trim()) return

    const newMessage = {
      sender: "You",
      message: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage],
    }))
    // Simulate recipient reply
    setTimeout(() => {
      const reply = {
        sender: activeChat.name,
        message: `Got it! Thanks for your message.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages((prev) => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), reply],
      }))
    }, 1500)
  }

  const startCall = (device, type) => {
    if (callState && callState.status !== "ended") {
      addNotification(`Already in a call. End current call first.`, "error")
      return
    }
    setCallState({ type, status: "ringing", participant: device })
    addNotification(`Calling ${device.name} (${type} call)...`, "info")
    setTimeout(() => {
      setCallState((prev) => (prev ? { ...prev, status: "active" } : null))
      addNotification(`${device.name} answered the ${type} call.`, "success")
    }, 3000) // Simulate ringing
  }

  const endCall = () => {
    if (callState) {
      addNotification(`Call with ${callState.participant.name} ended.`, "info")
      setCallState(null)
      setIsMicMuted(false)
      setIsCameraOff(false)
    }
  }

  const toggleMic = () => {
    setIsMicMuted((prev) => !prev)
    addNotification(`Mic ${isMicMuted ? "unmuted" : "muted"}`, "info")
  }

  const toggleCamera = () => {
    setIsCameraOff((prev) => !prev)
    addNotification(`Camera ${isCameraOff ? "off" : "on"}`, "info")
  }

  // --- End Chat and Call Functions ---

  // --- Post and Live Stream Functions ---
  const handleNewPost = (type, content, file) => {
    const newPost = {
      id: Date.now(),
      author: currentUser.name,
      authorAvatar: currentUser.avatar,
      type: type, // 'status' or 'video'
      content: content,
      time: "Just now",
      likes: 0,
      comments: 0,
      hasLiked: false,
    }

    if (type === "video" && file) {
      newPost.videoUrl = URL.createObjectURL(file) // Create a blob URL for preview
    }

    setPosts((prev) => [newPost, ...prev])
    addNotification(`New ${type} posted!`, "success")
  }

  const togglePostLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likes: post.hasLiked ? post.likes - 1 : post.likes + 1, hasLiked: !post.hasLiked }
          : post,
      ),
    )
  }

  const startLiveStream = (title) => {
    if (isLiveStreaming) {
      addNotification("Already live! End current stream first.", "error")
      return
    }
    setIsLiveStreaming(true)
    setLiveStreamTitle(title || `${currentUser.name}'s Live Stream`)
    addNotification(`You are now LIVE! Topic: "${title}"`, "success")

    // Add a live stream post to the feed
    setPosts((prev) => [
      {
        id: `live-${Date.now()}`,
        author: currentUser.name,
        authorAvatar: currentUser.avatar,
        type: "live",
        title: title || `${currentUser.name}'s Live Stream`,
        streamerId: currentUser.id, // Assuming currentUser has an ID, or a way to identify them
        time: "Live now",
        viewers: liveStreamViewers, // Initial viewers, will be updated by effect
        isLive: true,
      },
      ...prev,
    ])
  }

  const endLiveStream = () => {
    setIsLiveStreaming(false)
    addNotification("Live stream ended.", "info")
    setPosts((prev) =>
      prev.map((post) =>
        post.type === "live" && post.isLive && post.author === currentUser.name
          ? { ...post, isLive: false, time: "Ended recently", viewers: liveStreamViewers } // Mark as ended
          : post,
      ),
    )
    setLiveStreamTitle("")
  }
  // --- End Post and Live Stream Functions ---

  // Components
  const Header = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SocialThrow Pro</h1>
              <p className="text-sm text-gray-500">Advanced Media Sharing Platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search files, devices, posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <div className="relative group">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            {notifications.length > 0 && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform scale-95 group-hover:scale-100">
                <div className="p-4 border-b border-gray-200">
                  <h5 className="font-semibold text-gray-800">Notifications</h5>
                </div>
                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-sm ${n.type === "success" ? "bg-green-50" : n.type === "error" ? "bg-red-50" : "bg-blue-50"}`}
                    >
                      <p className="font-medium text-gray-800">{n.message}</p>
                      <p className="text-xs text-gray-500">{n.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-t border-gray-200">
                  <button onClick={() => setNotifications([])} className="text-sm text-blue-600 hover:underline">
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
              <p className={`text-xs ${currentUser.status === "online" ? "text-green-600" : "text-gray-500"}`}>
                ● {currentUser.status}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">{currentUser.avatar}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const TabNavigation = () => (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6">
        <nav className="flex space-x-8">
          {[
            { id: "feed", label: "Feed", icon: Rss }, // New Feed Tab
            { id: "share", label: "Share Content", icon: Upload },
            { id: "received", label: "Received", icon: Users },
            { id: "gallery", label: "My Gallery", icon: Folder },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )

  const DeviceRadar = () => (
    <div className="relative w-96 h-96 mx-auto">
      {/* Radar circles with gradients */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 opacity-20"></div>
      <div className="absolute inset-8 rounded-full border-2 border-blue-300 opacity-30"></div>
      <div className="absolute inset-16 rounded-full border border-blue-400 opacity-40"></div>
      <div className="absolute inset-24 rounded-full border border-blue-500 opacity-50"></div>

      {/* Scanning effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-30 animate-spin"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      {/* Center (you) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center ring-4 ring-blue-200">
          <span className="text-white text-sm">You</span>
        </div>
      </div>

      {/* Nearby devices */}
      {nearbyDevices.map((device) => {
        const maxRadius = 120
        const minRadius = 40
        const radius = maxRadius - (device.distance / 4) * (maxRadius - minRadius)

        const x = 200 + Math.cos((device.angle * Math.PI) / 180) * radius
        const y = 200 + Math.sin((device.angle * Math.PI) / 180) * radius

        return (
          <div
            key={device.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              throwTarget?.id === device.id ? "scale-125 z-20" : ""
            }`}
            style={{ left: x, top: y }}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center relative ${
                device.online
                  ? device.status === "active"
                    ? "bg-green-500 shadow-lg shadow-green-200"
                    : device.status === "away"
                      ? "bg-yellow-500 shadow-lg shadow-yellow-200"
                      : "bg-orange-500 shadow-lg shadow-orange-200"
                  : "bg-gray-400"
              } ${throwTarget?.id === device.id ? "ring-4 ring-yellow-400" : "ring-2 ring-white"}`}
            >
              <span className="text-xl">{device.avatar}</span>

              {/* Signal strength indicator */}
              {device.online && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      device.signalStrength > 80
                        ? "bg-green-500"
                        : device.signalStrength > 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  ></div>
                </div>
              )}
            </div>

            {/* Device info tooltip */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-3 py-2 text-center whitespace-nowrap border">
              <p className="font-medium text-gray-900 text-sm">{device.name}</p>
              <p className="text-xs text-gray-500">{device.device}</p>
              <p className="text-xs text-gray-400">
                {device.distance.toFixed(1)}m • {device.signalStrength}%
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )

  const FileUploadZone = () => (
    <div className="space-y-6">
      {/* Upload options */}
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-medium text-gray-700">Upload Files</p>
          <p className="text-xs text-gray-500">Images, Videos, Documents</p>
        </button>

        <button className="p-6 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group">
          <Globe className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-medium text-gray-700">From URL</p>
          <p className="text-xs text-gray-500">Paste link to share</p>
        </button>

        <button className="p-6 border-2 border-dashed border-green-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group">
          <Folder className="w-8 h-8 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-medium text-gray-700">From Gallery</p>
          <p className="text-xs text-gray-500">Choose existing files</p>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx,.txt,.zip,.rar"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Selected files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">Selected Files ({selectedFiles.length})</h4>
            <button onClick={() => setSelectedFiles([])} className="text-sm text-red-600 hover:text-red-800">
              Clear All
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedFiles.map((file) => (
              <div
                key={file.id}
                className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg border-2 transition-all ${
                  shareMode === "throw" ? "cursor-grab hover:shadow-md" : ""
                }`}
                onMouseDown={(e) => handleDragStart(e, file.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{file.thumbnail}</div>
                  <div>
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(1)} MB • {file.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {shareMode === "throw" && (
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Drag to share</span>
                  )}
                  <button
                    onClick={() => setSelectedFiles((prev) => prev.filter((f) => f.id !== file.id))}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const ShareTab = () => (
    <div className="p-6 space-y-8">
      {/* Sharing controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Share Mode:</label>
            <select
              value={shareMode}
              onChange={(e) => setShareMode(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="throw">🎯 Throw Mode</option>
              <option value="direct">📤 Direct Send</option>
              <option value="broadcast">📡 Broadcast</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Privacy:</label>
            <select
              value={privacyMode}
              onChange={(e) => setPrivacyMode(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="friends">👥 Friends Only</option>
              <option value="public">🌍 Public</option>
              <option value="private">🔒 Private</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("radar")}
            className={`p-2 rounded-lg ${viewMode === "radar" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Zap className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Device Discovery */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Wifi className="w-6 h-6 text-green-500 mr-2" />
              Nearby Devices ({nearbyDevices.filter((d) => d.online).length}/{nearbyDevices.length})
            </h3>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {viewMode === "radar" ? (
            <div className="flex flex-col items-center">
              <DeviceRadar />
              <p className="text-sm text-gray-600 mt-4 text-center">
                {shareMode === "throw" ? "🎯 Drag files to devices to share" : "📤 Select device and click send"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {nearbyDevices.map((device) => (
                <div
                  key={device.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    device.online ? "border-green-200 bg-green-50 hover:border-green-300" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        device.online ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      <span className="text-xl text-white">{device.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{device.name}</p>
                      <p className="text-sm text-gray-600">{device.device}</p>
                      <p className="text-xs text-gray-500">
                        {device.distance.toFixed(1)}m away • {device.online ? device.status : "offline"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {device.online && (
                      <>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            device.signalStrength > 80
                              ? "bg-green-500"
                              : device.signalStrength > 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-xs text-gray-500">{device.signalStrength}%</span>
                      </>
                    )}
                    {shareMode === "direct" && device.online && selectedFiles.length > 0 && (
                      <button
                        onClick={() => shareFile(selectedFiles[0].id, device)}
                        className="ml-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                      >
                        Send
                      </button>
                    )}
                    {/* Chat and Call buttons */}
                    {device.online && (
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={() => startChat(device)}
                          title="Start Chat"
                          className="p-1 rounded-full text-blue-500 hover:bg-blue-100"
                        >
                          <MessageSquare className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => startCall(device, "voice")}
                          title="Voice Call"
                          className="p-1 rounded-full text-green-500 hover:bg-green-100"
                        >
                          <Phone className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => startCall(device, "video")}
                          title="Video Call"
                          className="p-1 rounded-full text-purple-500 hover:bg-purple-100"
                        >
                          <VideoCallIcon className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* File Upload */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Upload className="w-6 h-6 text-blue-500 mr-2" />
            Content to Share
          </h3>

          <FileUploadZone />
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Clock className="w-6 h-6 text-purple-500 mr-2" />
          Recent Shares
        </h3>

        <div className="space-y-3">
          {sentItems.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{item.thumbnail}</div>
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Shared to <span className="font-semibold">{item.to}</span> • {item.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    item.status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : item.status === "sending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {sentItems.length === 0 && <p className="text-center text-gray-500 py-4">No recent shares yet.</p>}
        </div>
      </div>
    </div>
  )

  const ReceivedTab = () => {
    const filteredItems = receivedItems
      .filter((item) => {
        if (filterBy === "all") return true
        return item.type === filterBy
      })
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.from.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) => {
        if (sortBy === "recent") {
          // More robust time sorting would convert "X min ago" to actual dates/timestamps
          return 0
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name)
        }
        if (sortBy === "size") {
          return b.size - a.size
        }
        if (sortBy === "popularity") {
          return b.likes - a.likes
        }
        return 0
      })

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <Download className="w-7 h-7 text-green-600 mr-3" />
            Received Content
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Filter:</label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
                <option value="archive">Archives</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="recent">Recent</option>
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="popularity">Popularity (Likes)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative p-4 pb-0">
                  <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-5xl text-gray-400 overflow-hidden">
                    {item.type === "image" && <ImageIcon className="w-16 h-16 text-blue-400" />}
                    {item.type === "video" && <Video className="w-16 h-16 text-purple-400" />}
                    {item.type === "document" && <FileText className="w-16 h-16 text-green-400" />}
                    {item.type === "archive" && <Archive className="w-16 h-16 text-yellow-400" />}
                    {!["image", "video", "document", "archive"].includes(item.type) && item.thumbnail
                      ? item.thumbnail
                      : null}
                  </div>
                  <div className="absolute top-6 left-6 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">
                      {item.fromAvatar}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{item.from}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.size.toFixed(1)} MB • {item.time}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <button
                        className={`p-1 rounded-full ${item.liked ? "text-red-500" : "text-gray-400"} hover:bg-gray-100`}
                      >
                        <Heart className="w-5 h-5" fill={item.liked ? "currentColor" : "none"} />
                      </button>
                      <span className="text-sm">{item.liked ? 1 : 0}</span>
                      <button className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <span className="text-sm">{item.comments}</span>
                    </div>
                    <button className="p-1 rounded-full text-blue-500 hover:bg-blue-100">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No received content yet.</p>
              <p className="text-sm">Start sharing with your connections!</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const GalleryTab = () => {
    const filteredGalleryItems = galleryItems
      .filter((item) => {
        if (filterBy === "all") return true
        if (filterBy === "documents") return item.type === "document" || item.type === "archive"
        return item.type === filterBy
      })
      .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "recent") {
          return new Date(b.date) - new Date(a.date)
        }
        if (sortBy === "name") {
          return a.name.localeCompare(b.name)
        }
        if (sortBy === "size") {
          return b.size - a.size
        }
        if (sortBy === "popularity") {
          return b.shared - a.shared
        }
        return 0
      })

    const getFileIcon = useCallback((type) => {
      switch (type) {
        case "image":
          return <ImageIcon className="w-10 h-10 text-blue-500" />
        case "video":
          return <Video className="w-10 h-10 text-purple-500" />
        case "document":
          return <FileText className="w-10 h-10 text-green-500" />
        case "archive":
          return <Archive className="w-10 h-10 text-yellow-500" />
        default:
          return <FileIcon className="w-10 h-10 text-gray-500" />
      }
    }, [])

    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <Folder className="w-7 h-7 text-orange-600 mr-3" />
            My Gallery
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Filter:</label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
                <option value="archive">Archives</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="recent">Date Added</option>
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="popularity">Times Shared</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredGalleryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGalleryItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center p-4">
                    <div className="flex-shrink-0 mr-4">{getFileIcon(item.type)}</div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.size.toFixed(1)} MB • {item.date}
                      </p>
                    </div>
                    <div className="ml-4 text-sm text-gray-600 flex items-center">
                      <Share2 className="w-4 h-4 mr-1 text-blue-400" /> {item.shared}
                    </div>
                  </div>
                  <div className="flex justify-around border-t border-gray-100 p-2">
                    <button className="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </button>
                    <button className="text-gray-500 hover:text-green-600 flex items-center text-sm">
                      <Share2 className="w-4 h-4 mr-1" /> Share
                    </button>
                    <button className="text-gray-500 hover:text-red-600 flex items-center text-sm">
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              <Folder className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Your gallery is empty.</p>
              <p className="text-sm">Upload or receive files to populate your gallery.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const SettingsTab = () => {
    const [settings, setSettings] = useState({
      darkMode: false,
      notifications: true,
      autoDownload: false,
      pairedDevices: true,
      dataSaver: false,
      callQuality: "auto",
    })

    const handleSettingChange = (e) => {
      const { name, type, checked, value } = e.target
      setSettings((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
      addNotification(`${name} setting updated to ${type === "checkbox" ? checked : value}`, "info")
    }

    return (
      <div className="p-6 space-y-8">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <Settings className="w-7 h-7 text-gray-600 mr-3" />
          Application Settings
        </h3>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h4 className="text-xl font-semibold text-gray-800">General</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <label htmlFor="darkMode" className="font-medium text-gray-700">
                Dark Mode
              </label>
              <input
                type="checkbox"
                id="darkMode"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleSettingChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <label htmlFor="notifications" className="font-medium text-gray-700">
                Enable Notifications
              </label>
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={settings.notifications}
                onChange={handleSettingChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <label htmlFor="autoDownload" className="font-medium text-gray-700">
                Auto-download Received Files
              </label>
              <input
                type="checkbox"
                id="autoDownload"
                name="autoDownload"
                checked={settings.autoDownload}
                onChange={handleSettingChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <label htmlFor="dataSaver" className="font-medium text-gray-700">
                Data Saver Mode
              </label>
              <input
                type="checkbox"
                id="dataSaver"
                name="dataSaver"
                checked={settings.dataSaver}
                onChange={handleSettingChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <label htmlFor="callQuality" className="font-medium text-gray-700">
                Call Quality
              </label>
              <select
                id="callQuality"
                name="callQuality"
                value={settings.callQuality}
                onChange={handleSettingChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="auto">Auto</option>
                <option value="low">Low (Bandwidth Saver)</option>
                <option value="medium">Medium</option>
                <option value="high">High (Best Quality)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h4 className="text-xl font-semibold text-gray-800">Privacy & Security</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <label htmlFor="privacyDefault" className="font-medium text-gray-700">
                Default Share Privacy
              </label>
              <select
                id="privacyDefault"
                name="privacyDefault"
                value={privacyMode} // Reusing privacyMode state for simplicity
                onChange={(e) => setPrivacyMode(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="friends">Friends Only</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <label htmlFor="pairedDevices" className="font-medium text-gray-700">
                Only Allow Paired Devices
              </label>
              <input
                type="checkbox"
                id="pairedDevices"
                name="pairedDevices"
                checked={settings.pairedDevices}
                onChange={handleSettingChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
            <Shield className="w-5 h-5 mr-2" /> Manage Blocked Users
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h4 className="text-xl font-semibold text-gray-800">Account</h4>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
            <UserPlus className="w-5 h-5 mr-2" /> Add/Manage Accounts
          </button>
          <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
            <MoreVertical className="w-5 h-5 mr-2" /> View Activity Log
          </button>
        </div>
      </div>
    )
  }

  // --- Chat Window Component ---
  const ChatWindow = () => {
    const [inputMessage, setInputMessage] = useState("")
    const messages = chatMessages[activeChat.id] || []

    const handleSubmit = (e) => {
      e.preventDefault()
      sendMessage(inputMessage)
      setInputMessage("")
    }

    return (
      <div className="fixed bottom-4 right-4 w-96 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{activeChat.avatar}</span>
            <span className="font-semibold">{activeChat.name}</span>
            <span className={`w-2 h-2 rounded-full ${activeChat.online ? "bg-green-300" : "bg-gray-400"}`}></span>
          </div>
          <button onClick={() => setActiveChat(null)} className="text-white hover:text-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div
                className={`p-3 rounded-lg max-w-[75%] ${
                  msg.sender === "You"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <span className="text-xs opacity-75 block text-right mt-1">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={chatMessagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" title="Send">
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    )
  }

  // --- Call Window Component ---
  const CallWindow = () => {
    if (!callState) return null

    const { type, status, participant } = callState
    const isVideo = type === "video"

    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-gray-900 rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden text-white">
        {/* Video / Avatar Area */}
        <div className="flex-1 relative flex items-center justify-center bg-gray-800">
          {status === "active" && isVideo ? (
            <>
              <div className="absolute inset-0 bg-black flex items-center justify-center text-gray-400">
                <VideoCallIcon className="w-24 h-24 opacity-20" />
                <span className="text-lg absolute bottom-4 left-4">{participant.name}'s Camera</span>
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 border-2 border-gray-600 rounded-lg flex items-center justify-center text-sm text-gray-400">
                  <User className="w-12 h-12 opacity-50" />
                  <span className="absolute bottom-1">Your Camera</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-8xl p-4 bg-gray-700 rounded-full">{participant.avatar}</div>
          )}
          <span className="absolute top-4 left-4 text-sm font-semibold text-gray-300">
            {type === "video" ? "Video Call" : "Voice Call"}
          </span>
        </div>

        {/* Call Info */}
        <div className="p-4 text-center bg-gray-800">
          <h4 className="text-2xl font-bold">{participant.name}</h4>
          <p className="text-lg text-gray-300">
            {status === "ringing" && `Ringing...`}
            {status === "connecting" && `Connecting...`}
            {status === "active" && `Active Call`}
            {status === "ended" && `Call Ended`}
          </p>
        </div>

        {/* Call Controls */}
        <div className="bg-gray-950 p-4 flex justify-center space-x-6">
          <button
            onClick={toggleMic}
            className={`p-4 rounded-full ${isMicMuted ? "bg-red-600" : "bg-gray-700"} text-white hover:opacity-80 transition-opacity`}
            title={isMicMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMicMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          {isVideo && (
            <button
              onClick={toggleCamera}
              className={`p-4 rounded-full ${isCameraOff ? "bg-red-600" : "bg-gray-700"} text-white hover:opacity-80 transition-opacity`}
              title={isCameraOff ? "Turn Camera On" : "Turn Camera Off"}
            >
              {isCameraOff ? <VideoCallIcon className="w-6 h-6" /> : <VideoCallIcon className="w-6 h-6" />}
            </button>
          )}
          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            title="End Call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    )
  }

  // --- Feed Tab Component ---
  const FeedTab = () => {
    const [statusText, setStatusText] = useState("")
    const [videoFile, setVideoFile] = useState(null)
    const [isPostingVideo, setIsPostingVideo] = useState(false)
    const [newLiveStreamTitle, setNewLiveStreamTitle] = useState("")

    const handlePostSubmit = (e) => {
      e.preventDefault()
      if (statusText.trim() || videoFile) {
        if (isPostingVideo && videoFile) {
          handleNewPost("video", statusText, videoFile)
          setVideoFile(null)
          setIsPostingVideo(false)
        } else if (statusText.trim()) {
          handleNewPost("status", statusText)
        }
        setStatusText("")
      }
    }

    const handleVideoFileSelect = (event) => {
      const file = event.target.files[0]
      if (file && file.type.startsWith("video/")) {
        setVideoFile(file)
      } else {
        setVideoFile(null)
        addNotification("Please select a valid video file.", "error")
      }
    }

    const handleLiveStreamClick = () => {
      if (isLiveStreaming) {
        endLiveStream()
      } else {
        startLiveStream(newLiveStreamTitle)
      }
    }

    return (
      <div className="p-6 space-y-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <Rss className="w-7 h-7 text-blue-600 mr-3" />
          Professional Feed
        </h3>

        {/* Create Post Section */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
              {currentUser.avatar}
            </div>
            <p className="font-semibold text-gray-800">What's on your mind, {currentUser.name.split(" ")[0]}?</p>
          </div>

          <form onSubmit={handlePostSubmit} className="space-y-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[80px]"
              placeholder="Share an update, an idea, or a project milestone..."
              value={statusText}
              onChange={(e) => setStatusText(e.target.value)}
            ></textarea>

            {isPostingVideo && (
              <div className="border border-dashed border-gray-300 p-4 rounded-lg flex items-center justify-center space-x-3 bg-gray-50">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileSelect}
                  ref={postVideoInputRef}
                  className="hidden"
                />
                {!videoFile ? (
                  <button
                    type="button"
                    onClick={() => postVideoInputRef.current?.click()}
                    className="flex items-center space-x-2 text-blue-600 hover:underline"
                  >
                    <VideoCamera className="w-5 h-5" />
                    <span>Select a video to upload</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <VideoCamera className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">{videoFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setVideoFile(null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsPostingVideo((prev) => !prev)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isPostingVideo ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <VideoCamera className="w-5 h-5" />
                  <span>Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    /* Implement photo upload */ addNotification("Photo upload not yet implemented.", "info")
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                >
                  <Camera className="w-5 h-5" />
                  <span>Photo</span>
                </button>
              </div>
              <button
                type="submit"
                disabled={!statusText.trim() && !videoFile}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Post <PostSendIcon className="w-4 h-4 inline-block ml-2" />
              </button>
            </div>
          </form>

          {/* Go Live Section */}
          <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center">
              <LiveIcon className="w-5 h-5 text-red-500 mr-2" /> Go Live!
            </h4>
            <input
              type="text"
              placeholder="Enter live stream title (e.g., 'Weekly Tech Review')"
              value={newLiveStreamTitle}
              onChange={(e) => setNewLiveStreamTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              disabled={isLiveStreaming}
            />
            <button
              onClick={handleLiveStreamClick}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                isLiveStreaming ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {isLiveStreaming ? (
                <>
                  <CircleDotDashed className="w-5 h-5 mr-2 animate-pulse" /> End Stream
                </>
              ) : (
                <>
                  <LiveIcon className="w-5 h-5 mr-2" /> Go Live Now!
                </>
              )}
            </button>
            {isLiveStreaming && (
              <p className="text-sm text-center text-gray-600">
                You are live! Current viewers: <span className="font-bold">{liveStreamViewers}</span>
              </p>
            )}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                    {post.authorAvatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.time}</p>
                  </div>
                  {post.type === "live" && post.isLive && (
                    <span className="ml-auto flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium animate-pulse">
                      <LiveIcon className="w-3 h-3 mr-1" /> LIVE
                    </span>
                  )}
                </div>

                {post.type === "status" && <p className="text-gray-800 leading-relaxed">{post.content}</p>}

                {post.type === "video" && (
                  <div className="relative">
                    <video
                      controls
                      src={post.videoUrl}
                      className="w-full rounded-lg max-h-96 object-contain bg-black"
                    ></video>
                    {post.content && <p className="text-gray-800 mt-2">{post.content}</p>}
                  </div>
                )}

                {post.type === "live" && (
                  <div className="relative w-full h-64 bg-black rounded-lg flex items-center justify-center text-gray-400">
                    <VideoCallIcon className="w-24 h-24 opacity-20" />
                    <p className="absolute text-lg font-medium text-white top-4 left-4">{post.title}</p>
                    <div className="absolute bottom-4 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <ViewersIcon className="w-3 h-3 mr-1" /> {liveStreamViewers} Viewers{" "}
                      {/* Use liveStreamViewers from state */}
                    </div>
                    <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold rounded-lg hover:bg-opacity-60 transition-opacity">
                      <Play className="w-8 h-8 mr-2" /> Watch Live
                    </button>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-4 flex items-center justify-around text-gray-600">
                  <button
                    onClick={() => togglePostLike(post.id)}
                    className={`flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition-colors ${post.hasLiked ? "text-red-500" : ""}`}
                  >
                    <Heart className="w-5 h-5" fill={post.hasLiked ? "currentColor" : "none"} />
                    <span>{post.likes} Likes</span>
                  </button>
                  <button className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments} Comments</span>
                  </button>
                  <button className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
              <Rss className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No posts in your feed yet.</p>
              <p className="text-sm">Start by sharing an update or go live!</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Main application structure
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans" ref={containerRef}>
      <Header />
      <TabNavigation />

      <main className="flex-1 overflow-auto">
        {activeTab === "feed" && <FeedTab />} {/* New Feed Tab */}
        {activeTab === "share" && <ShareTab />}
        {activeTab === "received" && <ReceivedTab />}
        {activeTab === "gallery" && <GalleryTab />}
        {activeTab === "settings" && <SettingsTab />}
      </main>

      {/* Floating File being dragged */}
      {isDragging && dragStartPos.current.fileId && (
        <div
          className="fixed z-50 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            left: dragStartPos.current.x + dragPosition.x - 30, // Adjust for center of draggable item
            top: dragStartPos.current.y + dragPosition.y - 30,
            opacity: throwTarget ? 1 : 0.7,
            transform: throwTarget ? "scale(1.1)" : "scale(1)",
          }}
        >
          <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-3xl">
              {selectedFiles.find((f) => f.id === dragStartPos.current.fileId)?.thumbnail}
            </span>
          </div>
        </div>
      )}

      {/* Conditional rendering for Chat and Call Windows */}
      {activeChat && <ChatWindow />}
      {callState && <CallWindow />}
    </div>
  )
}

export default ProfessionalSocialThrow
