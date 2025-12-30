import React from 'react';
import { BoardingPassData } from '../types';
import { Plane, Calendar, User, MapPin, AlignLeft } from 'lucide-react';

interface BoardingPassFormProps {
  data: BoardingPassData;
  onChange: (data: BoardingPassData) => void;
}

export const BoardingPassForm: React.FC<BoardingPassFormProps> = ({ data, onChange }) => {
  
  const handleChange = (key: keyof BoardingPassData, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
      <h3 className="flex items-center gap-2 font-semibold text-slate-800 mb-4">
        <Plane className="w-4 h-4 text-slate-500" />
        Flight Details
      </h3>

      <div className="space-y-4">
        {/* Airline & Flight */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Airline Name</label>
            <input
              type="text"
              value={data.airline}
              onChange={(e) => handleChange('airline', e.target.value)}
              className="w-full text-sm p-2 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Flight No.</label>
            <input
              type="text"
              value={data.flightNumber}
              onChange={(e) => handleChange('flightNumber', e.target.value)}
              className="w-full text-sm p-2 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-mono bg-white"
            />
          </div>
        </div>

        {/* Passenger */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Passenger Name</label>
          <div className="relative">
            <User className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={data.passengerName}
              onChange={(e) => handleChange('passengerName', e.target.value)}
              className="w-full text-sm p-2 pl-9 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none uppercase bg-white"
            />
          </div>
        </div>

        {/* Route */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-500">Origin (From)</label>
            <input
              type="text"
              value={data.originCode}
              onChange={(e) => handleChange('originCode', e.target.value.toUpperCase())}
              className="w-full text-sm p-2 rounded-md border border-slate-200 mb-1 font-mono uppercase bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="IATA"
              maxLength={3}
            />
            <input
              type="text"
              value={data.originCity}
              onChange={(e) => handleChange('originCity', e.target.value)}
              className="w-full text-sm p-2 rounded-md border border-slate-200 bg-white"
              placeholder="City Name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-500">Destination (To)</label>
            <input
              type="text"
              value={data.destinationCode}
              onChange={(e) => handleChange('destinationCode', e.target.value.toUpperCase())}
              className="w-full text-sm p-2 rounded-md border border-slate-200 mb-1 font-mono uppercase bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="IATA"
              maxLength={3}
            />
            <input
              type="text"
              value={data.destinationCity}
              onChange={(e) => handleChange('destinationCity', e.target.value)}
              className="w-full text-sm p-2 rounded-md border border-slate-200 bg-white"
              placeholder="City Name"
            />
          </div>
        </div>

        {/* Timing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full text-sm p-2 rounded-md border border-slate-200 bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Time</label>
            <input
              type="time"
              value={data.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="w-full text-sm p-2 rounded-md border border-slate-200 bg-white"
            />
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Gate</label>
            <input
              type="text"
              value={data.gate}
              onChange={(e) => handleChange('gate', e.target.value)}
              className="w-full text-sm p-2 rounded-md border border-slate-200 text-center font-mono bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Seat</label>
            <input
              type="text"
              value={data.seat}
              onChange={(e) => handleChange('seat', e.target.value)}
              className="w-full text-sm p-2 rounded-md border border-slate-200 text-center font-mono bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Group</label>
            <input
              type="text"
              value={data.group}
              onChange={(e) => handleChange('group', e.target.value)}
              className="w-full text-sm p-2 rounded-md border border-slate-200 text-center font-mono bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                 <label className="block text-xs font-medium text-slate-500 mb-1">Class</label>
                 <select 
                    value={data.classType}
                    onChange={(e) => handleChange('classType', e.target.value)}
                    className="w-full text-sm p-2 rounded-md border border-slate-200 bg-white"
                 >
                    <option value="Economy">Economy</option>
                    <option value="Premium">Premium</option>
                    <option value="Business">Business</option>
                    <option value="First">First Class</option>
                 </select>
            </div>
             <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Remarks</label>
                <input
                    type="text"
                    value={data.remarks}
                    onChange={(e) => handleChange('remarks', e.target.value)}
                    className="w-full text-sm p-2 rounded-md border border-slate-200 bg-white"
                />
             </div>
        </div>
        
        {/* New Multi-line Notes Section */}
        <div className="pt-2 border-t border-slate-100">
           <label className="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
              <AlignLeft className="w-3 h-3" />
              Additional Notes (Printed on Pass)
           </label>
           <textarea
              value={data.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full text-sm p-2 rounded-md border border-slate-200 min-h-[60px] resize-y focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
              placeholder="Add custom notes, messages, or details here..."
           />
        </div>
      </div>
    </div>
  );
};