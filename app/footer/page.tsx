export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">
                DESIGN<span className="text-teal-500">STUDIO</span>
              </h2>
              <p className="mt-2 text-gray-400">Creating visual experiences that inspire.</p>
            </div>
  
            <div className="text-center md:text-right">
              <p className="text-gray-400">© {new Date().getFullYear()} Design Studio. All rights reserved.</p>
              <p className="mt-2 text-sm text-gray-500">Designed and developed with passion.</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  