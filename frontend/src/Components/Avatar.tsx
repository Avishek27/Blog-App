export const Avatar = ({ name,size = 6 }: {name: string,size?: number}) => {
    return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 ">{name[0]}</span>
        </div>

}